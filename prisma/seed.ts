import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import bcrypt from 'bcryptjs'

const adapter = new PrismaBetterSqlite3({ url: 'file:dev.db' })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clear existing data to avoid duplicates on re-run
  await prisma.opcaoFormulario.deleteMany({})
  await prisma.galeriaItem.deleteMany({})
  await prisma.recheio.deleteMany({})
  
  // Seed Configuracao
  await prisma.configuracao.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteTitle: "Doce Amor | Confeitaria Artesanal",
      heroTitle: "Arte em forma de Açúcar",
      heroSubtitle: "Descubra os sabores mais incríveis e os temas mais encantadores para tornar o seu momento inesquecível. Tudo feito com muito amor e ingredientes selecionados.",
      phone: "(66) 99624-5858",
      whatsapp: "5566996245858",
      instagram: "doceamor",
      facebook: "doceamor",
      alertBannerActive: false,
      alertBannerText: "Agenda fechada para este final de semana!"
    },
  })

  // Seed Recheios
  const recheios = [
    {
      nome: "Brigadeiro Gourmet",
      descricao: "O clássico que nunca erra! Feito com cacau 50% e um toque especial para ficar incrivelmente cremoso e com sabor de infância. Perfeito para qualquer massa.",
      imagem: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=600&auto=format&fit=crop",
      precoKg: 85.0,
      tags: "Mais Pedido",
      destaque: true
    },
    {
      nome: "Pura Nutella",
      descricao: "Camadas generosas de Nutella autêntica. O sabor inconfundível da avelã e do chocolate que transforma o bolo numa verdadeira explosão de doçura.",
      imagem: "https://www.sendbestgift.com/assets/images/product/0b99616341bbf08d37f338ef31cbee16.webp",
      precoKg: 95.0,
      tags: "Premium",
      destaque: false
    },
    {
      nome: "Beijinho de Coco",
      descricao: "Um docinho tradicional feito com muito coco de qualidade, o melhor leite condensado e amor. Traz uma textura deliciosa e equilibrada para o seu pedido.",
      imagem: "https://vovopalmirinha.com.br/wp-content/uploads/2019/03/beijinho-de-coco.jpg",
      precoKg: 75.0,
      destaque: false
    },
    {
      nome: "Creme de Ninho",
      descricao: "O queridinho do momento! Um creme aveludado, suave e irresistível, feito com puro leite Ninho em pó. Muito versátil, simplesmente combina com tudo.",
      imagem: "https://dikadanaka.com.br/wp-content/uploads/2024/06/FOTO1-bolo-de-leite-ninho-scaled.jpg",
      precoKg: 80.0,
      tags: "Novidade",
      destaque: false
    }
  ]

  for (const recheio of recheios) {
    await prisma.recheio.create({ data: recheio })
  }

  // Seed Galeria
  const galeria = [
    {
      titulo: "Festa de 15 Anos",
      categoria: "15 Anos",
      imagem: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?q=80&w=600&auto=format&fit=crop",
      ordem: 1
    },
    {
      titulo: "Chá Revelação",
      categoria: "Infantil",
      imagem: "https://i.pinimg.com/originals/ee/e3/c6/eee3c6025050ae04c32d9c3bebe4ddfb.jpg",
      ordem: 2
    },
    {
      titulo: "Casamentos Especiais",
      categoria: "Casamento",
      imagem: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=600&auto=format&fit=crop",
      ordem: 3
    },
    {
      titulo: "Festas Temáticas",
      categoria: "Temático",
      imagem: "https://cdn.shopify.com/s/files/1/0502/8351/1961/files/IMG_5322_500x.jpg?v=1695587670",
      ordem: 4
    }
  ]

  for (const item of galeria) {
    await prisma.galeriaItem.create({ data: item })
  }

  // Seed Opcoes Formulario
  const opcoes = [
    { categoria: "Tamanho", valor: "1kg (10 fatias)" },
    { categoria: "Tamanho", valor: "1.5kg (15 fatias)" },
    { categoria: "Tamanho", valor: "2kg (20 fatias)" },
    { categoria: "Massa", valor: "Pão de Ló" },
    { categoria: "Massa", valor: "Chocolate" },
    { categoria: "Massa", valor: "Red Velvet" }
  ]

  for (const opcao of opcoes) {
    await prisma.opcaoFormulario.create({ data: opcao })
  }

  // Seed Usuario Admin
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.usuario.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      login: 'admin',
      password: hashedPassword
    }
  })

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
