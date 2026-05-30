import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: "Login", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) return null

        const user = await prisma.usuario.findUnique({
          where: { login: credentials.login }
        })

        if (!user) return null

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) return null

        return { id: user.id, name: user.login }
      }
    })
  ],
  pages: {
    signIn: (process.env.ADMIN_PATH || '/admin') + '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.sub
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }
