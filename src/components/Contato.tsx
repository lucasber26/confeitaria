'use client'

import { useState } from 'react'

interface Opcao {
  categoria: string
  valor: string
}

interface ContatoProps {
  phone: string
  whatsapp: string
  opcoes: Opcao[]
  recheios: string[]
}

export default function Contato({ phone, whatsapp, opcoes, recheios }: ContatoProps) {
  const [formData, setFormData] = useState({
    nome: '',
    tamanho: '',
    massa: '',
    recheio: '',
    detalhes: ''
  })

  const tamanhos = opcoes.filter(o => o.categoria === 'Tamanho')
  const massas = opcoes.filter(o => o.categoria === 'Massa')

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message = `Olá! Gostaria de fazer um orçamento:
*Nome:* ${formData.nome}
*Tamanho:* ${formData.tamanho}
*Massa:* ${formData.massa}
*Recheio:* ${formData.recheio}
*Detalhes:* ${formData.detalhes}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsapp}?text=${encodedMessage}`, '_blank')
  }

  return (
    <section id="contato" className="section bg-white">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[40px] shadow-2xl text-center border border-primary-light/30" data-aos="fade-up">
        <h2 className="text-4xl font-serif mb-4 text-primary-dark">Gostou das nossas doces criações?</h2>
        <p className="text-lg text-text-muted mb-8">Preencha os detalhes abaixo para estruturar seu pedido e finalize no WhatsApp!</p>
        
        <form onSubmit={handleSendWhatsApp} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Seu Nome</label>
            <input 
              required
              type="text" 
              placeholder="Como podemos te chamar?"
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.nome}
              onChange={e => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tamanho do Bolo</label>
            <select 
              required
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              value={formData.tamanho}
              onChange={e => setFormData({...formData, tamanho: e.target.value})}
            >
              <option value="">Selecione...</option>
              {tamanhos.map(o => <option key={o.valor} value={o.valor}>{o.valor}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tipo de Massa</label>
            <select 
              required
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              value={formData.massa}
              onChange={e => setFormData({...formData, massa: e.target.value})}
            >
              <option value="">Selecione...</option>
              {massas.map(o => <option key={o.valor} value={o.valor}>{o.valor}</option>)}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Recheio de Preferência</label>
            <select 
              required
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
              value={formData.recheio}
              onChange={e => setFormData({...formData, recheio: e.target.value})}
            >
              <option value="">Selecione...</option>
              {recheios.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Observações Adicionais</label>
            <textarea 
              rows={3}
              placeholder="Algum tema específico ou restrição alimentar?"
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.detalhes}
              onChange={e => setFormData({...formData, detalhes: e.target.value})}
            ></textarea>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col items-center gap-4 mt-4">
            <div className="text-2xl font-bold text-primary-dark">{phone}</div>
            <button type="submit" className="btn-primary btn-large w-full md:w-auto animate-pulse">
              Falar no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
