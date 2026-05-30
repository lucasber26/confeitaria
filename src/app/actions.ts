'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'

async function checkAuth() {
  const session = await getServerSession()
  if (!session) throw new Error('Não autorizado')
  return session
}

export async function updateConfig(data: any) {
  await checkAuth()
  
  await prisma.configuracao.update({
    where: { id: 1 },
    data: {
      siteTitle: data.siteTitle,
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      heroImage: data.heroImage,
      phone: data.phone,
      whatsapp: data.whatsapp,
      alertBannerActive: data.alertBannerActive,
      alertBannerText: data.alertBannerText,
    }
  })

  revalidatePath('/')
  revalidatePath('/admin')
}

// Recheios CRUD
export async function createRecheio(data: any) {
  await checkAuth()
  await prisma.recheio.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/recheios')
}

export async function updateRecheio(id: string, data: any) {
  await checkAuth()
  await prisma.recheio.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/recheios')
}

export async function deleteRecheio(id: string) {
  await checkAuth()
  await prisma.recheio.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin/recheios')
}

// Galeria CRUD
export async function createGaleriaItem(data: any) {
  await checkAuth()
  await prisma.galeriaItem.create({ data })
  revalidatePath('/')
  revalidatePath('/admin/galeria')
}

export async function updateGaleriaItem(id: string, data: any) {
  await checkAuth()
  await prisma.galeriaItem.update({ where: { id }, data })
  revalidatePath('/')
  revalidatePath('/admin/galeria')
}

export async function deleteGaleriaItem(id: string) {
  await checkAuth()
  await prisma.galeriaItem.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/admin/galeria')
}
