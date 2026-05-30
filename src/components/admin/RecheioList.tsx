'use client'

import { useState } from 'react'
import { createRecheio, updateRecheio, deleteRecheio } from '@/app/actions'
import Image from 'next/image'

export default function RecheioList({ initialRecheios }: { initialRecheios: any[] }) {
  const [recheios, setRecheios] = useState(initialRecheios)
  const [isEditing, setIsEditing] = useState<any>(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: '',
    precoKg: 0,
    tags: '',
    destaque: false
  })

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setLoading] = useState(false)

  const resetForm = () => {
    setFormData({ nome: '', descricao: '', imagem: '', precoKg: 0, tags: '', destaque: false })
    setIsEditing(null)
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = formData.imagem

    // Se houver um novo arquivo, faz o upload primeiro
    if (file) {
      const uploadData = new FormData()
      uploadData.append('file', file)
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        })
        const data = await res.json()
        imageUrl = data.url
      } catch (error) {
        alert('Erro ao fazer upload da imagem')
        setLoading(false)
        return
      }
    }

    if (!imageUrl) {
      alert('Por favor, selecione uma imagem')
      setLoading(false)
      return
    }

    const finalData = { ...formData, imagem: imageUrl }

    if (isEditing) {
      await updateRecheio(isEditing.id, finalData)
    } else {
      await createRecheio(finalData)
    }
    
    setLoading(false)
    window.location.reload()
  }

  return (
    <div className="space-y-12">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">{isEditing ? 'Editar Recheio' : 'Novo Recheio'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nome</label>
            <input 
              required
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Preço por Kg</label>
            <input 
              required
              type="number" 
              step="0.01"
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.precoKg}
              onChange={e => setFormData({...formData, precoKg: parseFloat(e.target.value)})}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Descrição</label>
            <textarea 
              required
              rows={2}
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.descricao}
              onChange={e => setFormData({...formData, descricao: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Foto (JPG ou PNG)</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full p-2 border border-dashed border-gray-300 rounded-lg"
              onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
            />
            {formData.imagem && !file && (
              <p className="text-xs text-gray-500 mt-1">Imagem atual: {formData.imagem}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Etiqueta (ex: Mais Pedido)</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.tags || ''}
              onChange={e => setFormData({...formData, tags: e.target.value})}
            />
          </div>
          <div className="flex items-center gap-4">
            <button type="submit" disabled={uploading} className="btn-primary px-8 py-3 disabled:opacity-50">
              {uploading ? 'Processando...' : (isEditing ? 'Salvar' : 'Adicionar')}
            </button>
            {isEditing && (
              <button type="button" onClick={resetForm} className="text-gray-500 underline">Cancelar</button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="grid grid-cols-1 gap-4">
        {recheios.map(recheio => (
          <div key={recheio.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image src={recheio.imagem} alt={recheio.nome} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{recheio.nome}</h3>
              <p className="text-sm text-text-muted line-clamp-1">{recheio.descricao}</p>
              <span className="text-primary-dark font-bold">R$ {recheio.precoKg.toFixed(2)} / Kg</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsEditing(recheio)
                  setFormData(recheio)
                }}
                className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
              >
                Editar
              </button>
              <button 
                onClick={async () => {
                  if (confirm('Tem certeza?')) {
                    await deleteRecheio(recheio.id)
                    window.location.reload()
                  }
                }}
                className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
