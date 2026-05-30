import Image from 'next/image'

interface HeroProps {
  title: string
  subtitle: string
  heroImage: string
}

export default function Hero({ title, subtitle, heroImage }: HeroProps) {
  // Split title to apply highlight to last word if needed or just handle it
  const words = title.split(' ')
  const lastWord = words.pop()
  const firstPart = words.join(' ')

  return (
    <header id="home" className="min-h-screen pt-32 pb-20 px-[5%] flex flex-col lg:flex-row items-center justify-between gap-16 overflow-hidden">
      <div className="flex-1 max-w-2xl" data-aos="fade-up">
        <h1 className="text-6xl lg:text-7xl font-serif leading-[1.1] mb-6 text-primary-dark">
          {firstPart} <span className="highlight">{lastWord}</span>
        </h1>
        <p className="text-xl text-text-muted mb-10 leading-relaxed">
          {subtitle}
        </p>
        <a href="#sabores" className="btn-primary px-10 py-4 text-lg">Ver Menu</a>
      </div>

      <div className="flex-1 relative flex justify-center items-center" data-aos="zoom-in" data-aos-delay="200">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-linear-to-br from-primary-light to-bg-alt rounded-[40%_60%_70%_30%/40%_50%_60%_50%] -z-10 animate-float"></div>
        <div className="relative w-4/5 max-w-[450px] aspect-square rounded-2xl overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 hover:scale-105 duration-500">
          <Image 
            src={heroImage} 
            alt="Bolo Rosa Decorado"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </header>
  )
}
