import { loginAction } from '@lib/actions/auth-actions'
import { prisma } from '@lib/prisma'
import { redirect, RedirectType } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    redirect('/')
  }

  const verifyToken = await prisma.verificationToken.findUnique({
    where: { token },
  })

  if (!verifyToken) {
    redirect('/')
  }

  const user = await prisma.user.findFirst({
    where: { email: verifyToken.identifier },
    select: {
      id: true,
      email: true,
      password_hash: true,
      isAceptedTerms: true,
      emailVerified: true,
    },
  })

  if (!user) {
    redirect('/')
  }

  if (verifyToken.expires < new Date()) {
    await loginAction(user.email, user.password_hash, user.isAceptedTerms)
    redirect('/?token=expired')
  }

  if (user?.emailVerified) {
    redirect('/')
  }

  if (user && !user.emailVerified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    })

    await prisma.verificationToken.delete({
      where: { identifier: verifyToken.identifier },
    })
  }

  await loginAction(user.email, user.password_hash, user.isAceptedTerms)
  redirect('/')
}
