import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  const adminPath = process.env.ADMIN_PATH || '/admin'
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {session && (
        <aside className="w-full md:w-64 bg-primary-dark text-white p-6 flex flex-col gap-8">
          <div className="font-serif text-2xl font-bold">Admin Amor</div>
          
          <nav className="flex flex-col gap-4">
            <Link href={adminPath} className="hover:bg-primary-dark/50 p-3 rounded-lg transition-colors">Geral</Link>
            <Link href={`${adminPath}/recheios`} className="hover:bg-primary-dark/50 p-3 rounded-lg transition-colors">Recheios</Link>
            <Link href={`${adminPath}/galeria`} className="hover:bg-primary-dark/50 p-3 rounded-lg transition-colors">Galeria</Link>
            <Link href={`${adminPath}/formulario`} className="hover:bg-primary-dark/50 p-3 rounded-lg transition-colors">Formulário</Link>
          </nav>

          <div className="mt-auto">
            <Link href="/api/auth/signout" className="text-sm opacity-70 hover:opacity-100">Sair</Link>
          </div>
        </aside>
      )}

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
