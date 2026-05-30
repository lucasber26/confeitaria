import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import GaleriaList from '@/components/admin/GaleriaList'

export default async function GaleriaAdminPage() {
  const session = await getServerSession()
  if (!session) redirect((process.env.ADMIN_PATH || '/admin') + '/login')

  const items = await prisma.galeriaItem.findMany({ orderBy: { ordem: 'asc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary-dark">Gerenciar Galeria</h1>
      </div>
      
      <GaleriaList initialItems={items} />
    </div>
  )
}
