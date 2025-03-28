import { generateRefreshToken } from '@lib/actions/auth-actions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 },
      )
    }

    const success = await generateRefreshToken(email)

    // Siempre devuelve éxito incluso si el email no existe para evitar ataques de enumeración
    return NextResponse.json({
      success: true,
      message:
        'Si tu correo está registrado, recibirás un enlace de inicio de sesión',
    })
  } catch (error) {
    console.error('Error requesting login link:', error)
    return NextResponse.json(
      { success: false, error: 'Error al procesar la solicitud' },
      { status: 500 },
    )
  }
}
