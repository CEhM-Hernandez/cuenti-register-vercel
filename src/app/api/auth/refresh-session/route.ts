import { loginAction } from '@lib/actions/auth-actions'
import { prisma } from '@lib/prisma'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const token = searchParams.get('token')

  if (!token) {
    redirect('/')
  }

  try {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            password_hash: true,
            isAceptedTerms: true,
          },
        },
      },
    })

    if (!refreshToken || refreshToken.expires < new Date()) {
      if (refreshToken) {
        await prisma.refreshToken.delete({
          where: { id: refreshToken.id },
        })
      }
      redirect('/')
    }

    await loginAction(
      refreshToken.user.email,
      refreshToken.user.password_hash,
      refreshToken.user.isAceptedTerms,
    )

    await prisma.refreshToken.delete({
      where: { id: refreshToken.id },
    })

    redirect('/')
  } catch (error) {
    console.error('Error procesando refresh token:', error)
    return redirect('/')
  }
}
