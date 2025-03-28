import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

import authConfig from './auth.config'

const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const { nextUrl, auth } = req
  const isLogged = !!auth?.user

  if (!isLogged && nextUrl.pathname.includes('/steps')) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
