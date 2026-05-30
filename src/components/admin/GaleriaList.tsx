'use client'

import { useState } from 'react'
import { createGaleriaItem, updateGaleriaItem, deleteGaleriaItem } from '@/app/actions'
import Image from 'next/image'

export default function GaleriaList({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems)
  const [isEditing, setIsEditing] = useState<any>(null)
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    imagem: '',
    ordem: 0
  })

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setLoading] = useState(false)

  const resetForm = () => {
    setFormData({ titulo: '', categoria: '', imagem: '', ordem: 0 })
    setIsEditing(null)
    setFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let imageUrl = formData.imagem

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
      await updateGaleriaItem(isEditing.id, finalData)
    } else {
      await createGaleriaItem(finalData)
    }
    
    setLoading(false)
    window.location.reload()
  }

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">{isEditing ? 'Editar Item' : 'Novo Item na Galeria'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Título</label>
            <input 
              required
              type="text" 
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.titulo}
              onChange={e => setFormData({...formData, titulo: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Categoria</label>
            <input 
              required
              type="text" 
              placeholder="Ex: 15 Anos, Casamento, Infantil"
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.categoria}
              onChange={e => setFormData({...formData, categoria: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Foto</label>
            <input 
              type="file" 
              accept="image/*"
              className="w-full p-2 border border-dashed border-gray-300 rounded-lg"
              onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Ordem (Posição)</label>
            <input 
              type="number" 
              className="w-full p-3 rounded-lg border border-gray-200 outline-none"
              value={formData.ordem}
              onChange={e => setFormData({...formData, ordem: parseInt(e.target.value)})}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
            <div className="relative h-48 w-full">
              <Image src={item.imagem} alt={item.titulo} fill className="object-cover" />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{item.titulo}</h3>
                <p className="text-xs text-text-muted">{item.categoria}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setIsEditing(item)
                    setFormData(item)
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Editar
                </button>
                <button 
                  onClick={async () => {
                    if (confirm('Excluir este item?')) {
                      await deleteGaleriaItem(item.id)
                      window.location.reload()
                    }
                  }}
                  className="text-red-600 hover:underline text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
