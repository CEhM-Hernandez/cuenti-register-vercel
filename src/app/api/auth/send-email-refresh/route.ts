import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email, step, nickName, token } = await req.json()

    const baseUrl = process.env.NEXT_URL

    const res = await fetch(
      'https://api-conexion.cuenti.com/EM/sendEmailTemplate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 299,
          to: [{ email }],
          params: {
            url: `${baseUrl}/api/auth/refresh-session?token=${token}`,
            nickName: nickName || '',
            step,
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
