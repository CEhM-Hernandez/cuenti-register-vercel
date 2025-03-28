import { NextRequest, NextResponse } from 'next/server'
import { registerAction } from '@lib/actions/auth-actions'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const user = await registerAction(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { message: 'No se pudo guardar el usuario' },
      { status: 500 },
    )
  }
}
