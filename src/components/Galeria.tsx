import Image from 'next/image'

interface GaleriaItem {
  id: string
  imagem: string
  titulo: string
  categoria: string
  ordem: number
}

interface GaleriaProps {
  items: GaleriaItem[]
}

export default function Galeria({ items }: GaleriaProps) {
  return (
    <section id="temas" className="section bg-bg-alt">
      <div className="section-title" data-aos="fade-up">
        <h2>Temas <span className="highlight">Personalizados</span></h2>
        <p>Transformamos o seu sonho em uma doce realidade em tons de rosa e muito mais!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[5%]">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="group relative h-[350px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            data-aos="zoom-in"
            data-aos-delay={index * 100}
          >
            <Image 
              src={item.imagem} 
              alt={item.titulo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-secondary-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <span className="text-white font-serif text-2xl font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.titulo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
