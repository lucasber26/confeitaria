import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ConfigForm from '@/components/admin/ConfigForm'

export default async function AdminPage() {
  const session = await getServerSession()

  if (!session) {
    redirect((process.env.ADMIN_PATH || '/admin') + '/login')
  }

  const config = await prisma.configuracao.findUnique({ where: { id: 1 } })

  return (
    <div>
      <h1 className="text-3xl font-serif font-bold text-primary-dark mb-8">Configurações Gerais</h1>
      
      {config && <ConfigForm config={config} />}
    </div>
  )
}
