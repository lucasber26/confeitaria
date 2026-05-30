'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      login,
      password,
      redirect: false
    })

    if (result?.error) {
      setError('Credenciais inválidas.')
      setLoading(false)
    } else {
      // Pushing to the parent path to keep the secret URL used to access the login page
      const basePath = window.location.pathname.replace('/login', '')
      router.push(basePath || '/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-alt px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif text-primary-dark font-bold mb-2">Painel Administrativo</h1>
          <p className="text-text-muted">Doce Amor Confeitaria</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Usuário</label>
            <input 
              required
              type="text" 
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Senha</label>
            <input 
              required
              type="password" 
              className="w-full p-4 rounded-xl border border-primary-light focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-4 text-lg disabled:opacity-50"
          >
            {loading ? 'Acessando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
