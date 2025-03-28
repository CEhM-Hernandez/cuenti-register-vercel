'use server'

import { businessTypeTranslator } from '@/app/utils/businessTypeTranslator'
import { countyCuenti } from '@/app/utils/countyCuenti'
import { auth } from '@/auth'
import { TotalSteps } from '@/config/TotalSteps'
import { CuentiUser, webhookData } from '@/types'
import { decryptPassword } from '@lib/crypto'
import { prisma } from '@lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Usuario no autenticado' },
      { status: 401 },
    )
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) {
    return NextResponse.json(
      { error: 'Usuario no encontrado' },
      { status: 404 },
    )
  }

  if (user.lastStepId !== TotalSteps.length) {
    return NextResponse.json({ error: 'No se puede enviar datos' })
  }

  const formattedPhoneNumber =
    user.phone_prefix?.split('+')[1] + '+' + user.phone_number

  const { countryName, nombreDepartamento, nombreMunicipio, currencySymbol } =
    await countyCuenti({
      country_code: user.country_code!,
      city: user.city!,
      department: user.department!,
    })

  const cuentiUser: CuentiUser = {
    id_usuario: 0,
    selectorSeleccionado: businessTypeTranslator(user.business_type!),
    email_usuario: user.email,
    usuario: user.email,
    celular: formattedPhoneNumber,
    clave: await decryptPassword(user.password_hash!),
    nombre: user.name + ' ' + user.lastname,
    paisSeleccionado: countryName,
    ciudad: nombreMunicipio,
    departamento: nombreDepartamento,
    simbolo_moneda: currencySymbol,
    id_vendedor: user.allyCode,
    esJ4pro: 1,
  }

  console.log('cuentiUser:', cuentiUser)

  // const response = await registerOnCuenti({ cuentiUser })

  // if (response.error) {
  //   await prisma.user.update({
  //     where: { id: user.id },
  //     data: { lastStepId: user.lastStepId - 1 },
  //   })
  //   return NextResponse.json({
  //     error:
  //       'Error al enviar datos a Cuenti. Se actualizó el estado del usuario.',
  //     message: response.message,
  //   })
  // }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password_hash: user.password_hash.replace(
        ':',
        (Math.random() * 100).toString(),
      ),
    },
  })

  const id_empresa_cuenti = '0' // response.retorno || '0'

  const dataToWebhook: webhookData = {
    email: user.email,
    nombre: user.name!,
    surname: user.lastname!,
    nickName: user.name!.split(' ')[0],
    tipo_negocio_j4pro: user.business_type!,
    celular: user.phone_number!,
    pais: countryName,
    id_empresa_cuenti: id_empresa_cuenti,
    codigo_whatsapp: user.phone_prefix!.split('+')[1],
    estado: 'Demo Activo',
    ciclo_de_vida: 'Lead',
    viaje_del_cliente: 'Demo Activo',
    origen: 'App',
  }

  console.log('dataToWebhook:', dataToWebhook)

  const responseWebhook = await sendDataToWebhook({ data: dataToWebhook })

  if (!responseWebhook || responseWebhook.error) {
    return NextResponse.json({
      error:
        'Error al enviar datos a WebHook. Se actualizó el estado del usuario.',
      message: responseWebhook?.message || 'Error desconocido',
    })
  }

  return NextResponse.json({
    message: 'Datos enviados correctamente',
    ok: true,
  })
}

async function sendDataToWebhook({ data }: { data: any }) {
  try {
    const res = await fetch('https://n8n.cuenti.co/webhook/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const errorBody = await res.text()
      throw new Error(`Error HTTP ${res.status}: ${errorBody}`)
    }
  } catch (error) {
    console.error('Error al enviar datos a WebHook:', error)
    return {
      error: true,
      message: error instanceof Error ? error.message : String(error),
    }
  }
}

async function registerOnCuenti({ cuentiUser }: { cuentiUser: any }) {
  try {
    const res = await fetch(
      'https://api.cuenti.co/jServerj4ErpPro//j4pro/admin/usuario/grabarEmpresaUsuario',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuentiUser),
      },
    )

    if (!res.ok) {
      const errorBody = await res.text()
      throw new Error(`Error HTTP ${res.status}: ${errorBody}`)
    }

    const response = await res.json()

    if (response.message !== 'save') {
      throw new Error(`Mensaje inesperado: ${response.message}`)
    }

    return response
  } catch (error) {
    console.error('Error al enviar datos a Cuenti:', error)
    return {
      error: true,
      message: error instanceof Error ? error.message : String(error),
    }
  }
}
