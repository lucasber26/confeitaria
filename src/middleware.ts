import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const adminPath = process.env.ADMIN_PATH
  const path = request.nextUrl.pathname

  // Se o caminho solicitado começa com a rota secreta, fazemos um rewrite para /admin
  if (adminPath && adminPath !== '/admin' && path.startsWith(adminPath)) {
    const newPath = path.replace(adminPath, '/admin')
    return NextResponse.rewrite(new URL(newPath, request.url))
  }

  // Se tentar acessar /admin diretamente e NÃO for a rota secreta, podemos bloquear ou deixar passar (depende da estratégia)
  // No nosso caso, vamos deixar passar mas o PRD diz que "nenhum link deve apontar para essa rota".
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
