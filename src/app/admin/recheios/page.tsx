import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import RecheioList from '@/components/admin/RecheioList'

export default async function RecheiosAdminPage() {
  const session = await getServerSession()
  if (!session) redirect((process.env.ADMIN_PATH || '/admin') + '/login')

  const recheios = await prisma.recheio.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary-dark">Gerenciar Recheios</h1>
      </div>
      
      <RecheioList initialRecheios={recheios} />
    </div>
  )
}
