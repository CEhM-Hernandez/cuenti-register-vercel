import { prisma } from '@lib/prisma'
import { checkExistingEmailOnCuenti } from '@services/checkExistingEmailOnCuenti'
import {
  IncorrectPasswordError,
  EmailNotVerifiedError,
  AccountAlreadyExistsError,
  NotFoundError,
} from '@/types/errors'
import { sendEmailVerification } from '@/app/services/sendEmailVerification'
import { nanoid } from 'nanoid'
import { decryptPassword } from './crypto'

export async function checkMarketingUser(email: string, password: string) {
  const marketingUser = await prisma.user.findUnique({ where: { email } })
  if (!marketingUser) return null

  // Desencriptar la contraseña almacenada
  const decryptedPassword = await decryptPassword(marketingUser.password_hash)

  const isValidPassword =
    password === decryptedPassword || password === marketingUser.password_hash

  if (!isValidPassword) {
    throw new IncorrectPasswordError(
      '¡La contraseña ingresada es incorrecta! Por favor, intenta de nuevo.',
    )
  }

  if (!marketingUser.emailVerified) {
    const verifyToken = await prisma.verificationToken.findFirst({
      where: { identifier: marketingUser.email },
    })

    if (verifyToken && verifyToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { identifier: marketingUser.email },
      })
    }

    if (!verifyToken || verifyToken.expires < new Date()) {
      const newToken = await prisma.verificationToken.create({
        data: {
          identifier: marketingUser.email,
          token: nanoid(),
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      })
      await sendEmailVerification(marketingUser.email, newToken.token)
    } else {
      await sendEmailVerification(marketingUser.email, verifyToken.token)
    }

    throw new EmailNotVerifiedError(
      '¡Por favor, verifica tu correo electrónico! Te hemos enviado un email con un enlace para verificar tu cuenta.',
    )
  }

  return marketingUser
}

// -----------------------------

export async function validateUserCredentials(email: string, password: string) {
  const existsInCuenti = await checkExistingEmailOnCuenti(email)
  if (existsInCuenti) {
    throw new AccountAlreadyExistsError(
      '¡Parece que ya tienes una cuenta con nosotros! Por favor, inicia sesión para continuar.',
    )
  }

  const marketingUser = await checkMarketingUser(email, password)
  if (marketingUser) {
    return marketingUser
  }

  throw new NotFoundError('Usuario no encontrado')
}
