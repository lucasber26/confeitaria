import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Nome único para o arquivo
    const fileName = `${uuidv4()}.webp`
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const filePath = path.join(uploadDir, fileName)

    // Converte para WebP e otimiza usando sharp
    await sharp(buffer)
      .webp({ quality: 80 })
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .toFile(filePath)

    return NextResponse.json({ url: `/uploads/${fileName}` })
  } catch (error) {
    console.error('Erro no upload:', error)
    return NextResponse.json({ error: 'Erro ao processar imagem' }, { status: 500 })
  }
}
