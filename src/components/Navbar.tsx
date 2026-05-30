'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavbarProps {
  siteTitle: string
}

export default function Navbar({ siteTitle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full p-6 lg:px-[5%] flex justify-between items-center z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="font-serif text-3xl font-semibold text-primary-dark">
        {siteTitle.split(' | ')[0]}
      </div>
      
      <div className="hidden md:flex gap-8 items-center font-medium">
        <Link href="#home" className="hover:text-primary transition-colors">Início</Link>
        <Link href="#sabores" className="hover:text-primary transition-colors">Sabores e Recheios</Link>
        <Link href="#temas" className="hover:text-primary transition-colors">Temas</Link>
        <Link href="#contato" className="btn-primary">Faça seu Pedido</Link>
      </div>

      <button 
        className="md:hidden text-2xl text-primary-dark"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/98 flex flex-col p-8 gap-4 shadow-xl md:hidden">
          <Link href="#home" onClick={() => setIsMenuOpen(false)}>Início</Link>
          <Link href="#sabores" onClick={() => setIsMenuOpen(false)}>Sabores e Recheios</Link>
          <Link href="#temas" onClick={() => setIsMenuOpen(false)}>Temas</Link>
          <Link href="#contato" className="btn-primary w-fit" onClick={() => setIsMenuOpen(false)}>Faça seu Pedido</Link>
        </div>
      )}
    </nav>
  )
}
