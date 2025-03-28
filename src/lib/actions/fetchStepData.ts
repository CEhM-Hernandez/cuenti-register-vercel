'use server'

import { auth } from '@/auth'
import { prisma } from '@lib/prisma'

export async function fetchStepOneData() {
  try {
    const session = await auth()

    if (!session) {
      return
    }

    const { user } = session

    const data = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        business_type: true,
        other_business: true,
      },
    })

    if (!data) {
      return
    }

    return data
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error)
  }
}

export async function fetchStepTwoData() {
  try {
    const session = await auth()

    if (!session) {
      return
    }

    const { user } = session

    const data = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        name: true,
        lastname: true,
      },
    })

    if (!data) {
      return
    }

    return data
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error)
  }
}
