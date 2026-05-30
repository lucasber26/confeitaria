import { prisma } from '@/lib/prisma'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Recheios from '@/components/Recheios'
import Galeria from '@/components/Galeria'
import Contato from '@/components/Contato'
import Footer from '@/components/Footer'
import AOSInit from '@/components/AOSInit'

export default async function Home() {
  const config = await prisma.configuracao.findUnique({ where: { id: 1 } })
  const recheios = await prisma.recheio.findMany({ orderBy: { nome: 'asc' } })
  const galeria = await prisma.galeriaItem.findMany({ orderBy: { ordem: 'asc' } })
  const opcoesForm = await prisma.opcaoFormulario.findMany()

  if (!config) return <div>Configuração não encontrada. Por favor, execute o seed.</div>

  return (
    <main className="min-h-screen">
      <AOSInit />
      
      {config.alertBannerActive && config.alertBannerText && (
        <div className="bg-secondary text-white text-center py-2 px-[5%] font-medium fixed top-0 w-full z-[60]">
          {config.alertBannerText}
        </div>
      )}

      <Navbar siteTitle={config.siteTitle} />
      
      <Hero 
        title={config.heroTitle} 
        subtitle={config.heroSubtitle} 
        heroImage={config.heroImage}
      />

      <Recheios recheios={recheios} />

      <Galeria items={galeria} />

      <Contato 
        phone={config.phone} 
        whatsapp={config.whatsapp} 
        opcoes={opcoesForm}
        recheios={recheios.map(r => r.nome)}
      />

      <Footer />
    </main>
  )
}
