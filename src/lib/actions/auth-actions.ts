'use server'

import { AuthError } from 'next-auth'

import { auth, signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import { encryptPassword } from '@/lib/crypto'
import { randomBytes } from 'crypto'

import { StepName } from '@prisma/client'
import { EmailNotVerifiedError } from '@/types/errors'
import { TotalSteps } from '@/config/TotalSteps'
import { sendEmailVerification } from '@/app/services/sendEmailVerification'
import { nanoid } from 'nanoid'

export type AuthResult = {
  success: boolean
  error?: {
    name: string
    message: string
    title?: string
  }
}

export const loginAction = async (
  email: string,
  password: string,
  isAceptedTerms: boolean,
): Promise<AuthResult> => {
  try {
    const user = await signIn('credentials', {
      email,
      password,
      isAceptedTerms,
      redirect: false,
    })

    return user
  } catch (error) {
    if (error instanceof AuthError) {
      const cause = error.cause as any
      const errName = cause?.err?.name

      if (errName === 'EmailNotVerifiedError') {
        return {
          success: false,
          error: {
            name: 'EmailNotVerifiedError',
            message:
              cause?.err?.message ||
              'Por favor, verifica tu correo electrónico',
            title: cause?.err?.title || 'Verifica tu correo electrónico',
          },
        }
      }

      if (errName === 'IncorrectPasswordError') {
        return {
          success: false,
          error: {
            name: 'IncorrectPasswordError',
            message:
              cause?.err?.message || 'La contraseña ingresada es incorrecta',
          },
        }
      }

      if (errName === 'AccountAlreadyExistsError') {
        return {
          success: false,
          error: {
            name: 'AccountAlreadyExistsError',
            message:
              cause?.err?.message || 'Ya existe una cuenta con este email',
          },
        }
      }

      if (errName === 'NotFoundError') {
        return {
          success: false,
          error: {
            name: 'NotFoundError',
            message: cause?.err?.message || 'Usuario no encontrado',
          },
        }
      }
    }

    return {
      success: false,
      error: {
        name: 'UnknownError',
        message: 'Error al iniciar sesión',
      },
    }
  }
}

export const registerAction = async (data: {
  email: string
  password: string
  isAceptedTerms: boolean
  allyCode: number
}) => {
  try {
    const encryptedPassword = await encryptPassword(data.password)

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password_hash: encryptedPassword,
        isAceptedTerms: data.isAceptedTerms,
        lastStep: {
          connect: {
            name: StepName.EMAIL_PASSWORD,
          },
        },
        allyCode: data.allyCode,
      },
    })

    return await loginAction(data.email, data.password, data.isAceptedTerms)
  } catch (error: any) {
    if (error instanceof EmailNotVerifiedError)
      throw new EmailNotVerifiedError(error.message)
    else throw new Error(error.message)
  }
}

export async function getStep() {
  try {
    const session = await auth()

    if (!session || !session.user?.id) {
      return
    }

    const userID = session.user.id

    const user = await prisma.user.findUnique({
      where: { id: userID },
      select: {
        lastStepId: true,
      },
    })

    if (!user) {
      return
    }

    const step = user.lastStepId

    if (!step) {
      return
    }

    return step + 1
  } catch (error) {
    console.error('Error fetching user:', error)
  }
}

export async function generateRefreshToken(email: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true, name: true, lastStepId: true },
    })

    if (!user) {
      console.log('Usuario no encontrado')
      return false
    }

    if (!user.emailVerified) {
      console.log('Usuario no verificado')

      const verifyToken = await prisma.verificationToken.findFirst({
        where: { identifier: email },
      })

      if (verifyToken && verifyToken.expires < new Date()) {
        await prisma.verificationToken.delete({
          where: { identifier: email },
        })
      }

      if (!verifyToken || verifyToken.expires < new Date()) {
        const newToken = await prisma.verificationToken.create({
          data: {
            identifier: email,
            token: nanoid(),
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          },
        })
        await sendEmailVerification(email, newToken.token)
      } else {
        await sendEmailVerification(email, verifyToken.token)
      }

      return false
    }

    if (!user.lastStepId || user.lastStepId === TotalSteps.length) {
      console.log('Usuario ya completó todos los pasos')
      return false
    }

    const nextStep = await prisma.step.findFirst({
      where: { id: user?.lastStepId + 1 },
      select: { description: true },
    })

    if (!nextStep) {
      console.log('No se encontró el siguiente paso')
      return false
    }

    const token = randomBytes(32).toString('hex')

    const expires = new Date()
    expires.setHours(expires.getHours() + 24)

    await prisma.refreshToken.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    })

    await sendRefreshEmail({
      email,
      step: nextStep.description,
      nickName: user.name || undefined,
      token,
    })

    return true
  } catch (error) {
    console.error('Error generando refresh token:', error)
    return false
  }
}

async function sendRefreshEmail({
  email,
  step,
  nickName,
  token,
}: {
  email: string
  token: string
  step: string
  nickName?: string
}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_URL}/api/auth/send-email-refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, step, nickName }),
      },
    )

    if (!res) {
      throw new Error('Error al enviar correo de refresco')
    }

    return true
  } catch (error) {
    console.error('Error enviando correo de refresco:', error)
  }
}
