'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Recheio {
  id: string
  nome: string
  descricao: string
  imagem: string
  precoKg: number
  tags?: string | null
  destaque: boolean
}

interface RecheiosProps {
  recheios: Recheio[]
}

export default function Recheios({ recheios }: RecheiosProps) {
  const [activeTab, setActiveTab] = useState(recheios[0]?.id)

  const activeRecheio = recheios.find(r => r.id === activeTab)

  return (
    <section id="sabores" className="section bg-white/50">
      <div className="section-title" data-aos="fade-up">
        <h2>Nossos <span className="highlight">Sabores e Recheios</span></h2>
        <p>Combinações perfeitas que derretem na boca</p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden" data-aos="fade-up" data-aos-delay="100">
        <div className="flex bg-primary-light overflow-x-auto no-scrollbar">
          {recheios.map((recheio) => (
            <button
              key={recheio.id}
              onClick={() => setActiveTab(recheio.id)}
              className={`flex-1 min-w-[120px] py-5 px-4 font-semibold text-lg transition-all ${activeTab === recheio.id ? 'bg-secondary text-white' : 'text-primary-dark hover:bg-primary-light/80'}`}
            >
              {recheio.nome.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
          {activeRecheio && (
            <>
              <div className="flex-1 w-full aspect-square md:aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image 
                  src={activeRecheio.imagem} 
                  alt={activeRecheio.nome}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                {activeRecheio.tags && (
                  <span className="inline-block px-3 py-1 bg-secondary-dark text-white text-xs font-bold rounded-full mb-4">
                    {activeRecheio.tags}
                  </span>
                )}
                <h3 className="text-3xl font-serif text-secondary-dark mb-4">{activeRecheio.nome}</h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  {activeRecheio.descricao}
                </p>
                <div className="text-2xl font-bold text-primary-dark">
                  R$ {activeRecheio.precoKg.toFixed(2)} / Kg
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
