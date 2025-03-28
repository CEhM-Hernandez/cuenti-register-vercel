import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@lib/prisma'
import { TotalSteps } from '@/config/TotalSteps'
import { UserData } from '@/types'
import type { User } from '@prisma/client'
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js'

export async function POST(req: Request) {
  const session = await auth()
  const body = await req.json()

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 },
    )
  }
  if (!body) {
    return NextResponse.json(
      { error: 'No hay datos para enviar' },
      { status: 400 },
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 },
      )
    }

    const actualStep = body.step
    if (actualStep < 1 || actualStep > TotalSteps.length) {
      return NextResponse.json({ error: 'Paso incorrecto' }, { status: 400 })
    }

    const changes = getStepData(actualStep, body, user)

    const currentLastStep = user.lastStepId || 0
    const newLastStep = Math.max(currentLastStep, actualStep)
    if (newLastStep > currentLastStep) {
      changes.lastStep = { connect: { id: newLastStep } }
    }

    if (Object.keys(changes).length === 0) {
      return NextResponse.json({ message: 'No hay cambios' })
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: changes,
    })

    return NextResponse.json({
      message: 'Datos enviados correctamente',
      ok: true,
    })
  } catch (error) {
    console.error('Error al actualizar el paso:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el paso' },
      { status: 500 },
    )
  }
}

function getStepData(
  actualStep: number,
  body: Partial<UserData>,
  user: User,
): Record<string, any> {
  const update: Record<string, any> = {}

  switch (actualStep) {
    case 1: {
      if (body.businessType && body.businessType !== user.business_type) {
        update.business_type = body.businessType
      }
      if (body.otherBusiness && body.otherBusiness !== user.other_business) {
        update.other_business = body.otherBusiness
      }
      break
    }

    case 2: {
      if (body.name && body.name !== user.name) {
        update.name = body.name
      }
      if (body.lastname && body.lastname !== user.lastname) {
        update.lastname = body.lastname
      }
      break
    }

    case 3: {
      if (body.phoneNumber && body.countryCode) {
        try {
          const parsedPhone = parsePhoneNumberFromString(
            body.phoneNumber,
            body.countryCode.toUpperCase() as CountryCode,
          )
          if (parsedPhone && parsedPhone.isValid()) {
            if (parsedPhone.nationalNumber !== user.phone_number) {
              update.phone_number = parsedPhone.nationalNumber
            }
          } else {
            console.error('Número de teléfono inválido')
          }
        } catch (error) {
          console.error('Error al parsear el número de teléfono:', error)
        }
      }
      if (body.phonePrefix && body.phonePrefix !== user.phone_prefix) {
        update.phone_prefix = body.phonePrefix
      }
      if (body.countryCode && body.countryCode !== user.country_code) {
        update.country_code = body.countryCode
      }
      if (body.countryName && body.countryName !== user.country_name) {
        update.country_name = body.countryName
      }
      if (body.department && body.department !== user.department) {
        update.department = body.department
      }
      if (body.city && body.city !== user.city) {
        update.city = body.city
      }
      break
    }
  }

  return update
}
