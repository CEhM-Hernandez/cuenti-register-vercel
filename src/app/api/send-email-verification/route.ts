import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, token } = await req.json()

    const res = await fetch(
      'https://api-conexion.cuenti.com/EM/sendEmailTemplate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 298,
          to: [{ email }],
          params: {
            url: `${process.env.NEXT_URL}/api/auth/verify-email?token=${token}`,
          },
        }),
      },
    )

    if (!res.ok) {
      throw new Error('Error al enviar el correo')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json(
      { success: false, error: 'Error al enviar el correo' },
      { status: 500 },
    )
  }
}
