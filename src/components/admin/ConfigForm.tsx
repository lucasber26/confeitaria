'use client'

import { useState } from 'react'
import { updateConfig } from '@/app/actions'

export default function ConfigForm({ config }: { config: any }) {
  const [formData, setFormData] = useState(config)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    let imageUrl = formData.heroImage

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
        setMessage('Erro ao fazer upload da imagem.')
        setLoading(false)
        return
      }
    }

    try {
      await updateConfig({ ...formData, heroImage: imageUrl })
      setMessage('Configurações salvas com sucesso!')
      setFile(null)
    } catch (error) {
      setMessage('Erro ao salvar configurações.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Título do Site</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.siteTitle}
            onChange={e => setFormData({...formData, siteTitle: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Imagem do Hero (JPG ou PNG)</label>
          <input 
            type="file" 
            accept="image/*"
            className="w-full p-2 border border-dashed border-gray-300 rounded-lg text-sm"
            onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
          />
          {formData.heroImage && !file && (
            <p className="text-xs text-gray-500 mt-1 truncate">Atual: {formData.heroImage}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Telefone (Exibição)</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">WhatsApp (Apenas Números)</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.whatsapp}
            onChange={e => setFormData({...formData, whatsapp: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Título Hero</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.heroTitle}
            onChange={e => setFormData({...formData, heroTitle: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold mb-2">Subtítulo Hero</label>
          <textarea 
            rows={3}
            className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none"
            value={formData.heroSubtitle}
            onChange={e => setFormData({...formData, heroSubtitle: e.target.value})}
          />
        </div>

        <div className="md:col-span-2 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
          <div className="flex items-center gap-3 mb-4">
            <input 
              type="checkbox" 
              id="alertActive"
              className="w-5 h-5 accent-secondary"
              checked={formData.alertBannerActive}
              onChange={e => setFormData({...formData, alertBannerActive: e.target.checked})}
            />
            <label htmlFor="alertActive" className="font-bold text-secondary-dark cursor-pointer">Ativar Banner de Alerta</label>
          </div>
          <label className="block text-sm font-semibold mb-2 text-secondary-dark">Texto do Alerta</label>
          <input 
            type="text" 
            className="w-full p-3 rounded-lg border border-secondary/30 focus:ring-2 focus:ring-secondary/20 outline-none"
            value={formData.alertBannerText || ''}
            onChange={e => setFormData({...formData, alertBannerText: e.target.value})}
            placeholder="Ex: Agenda fechada para este final de semana!"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary px-8 py-3 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
        {message && <span className={`text-sm font-medium ${message.includes('Erro') ? 'text-red-500' : 'text-green-600'}`}>{message}</span>}
      </div>
    </form>
  )
}
