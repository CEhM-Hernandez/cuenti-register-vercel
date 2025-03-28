export async function sendEmailVerification(email: string, token: string) {
  try {
    if (!process.env.NEXT_URL) {
      throw new Error('NEXT_URL no está configurado')
    }

    const res = await fetch(
      `${process.env.NEXT_URL}/api/send-email-verification`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token }),
      },
    )

    if (!res.ok) throw new Error('Fallo en la API de envío de email')

    return true
  } catch (error) {
    console.error(error)
    throw new Error('Error enviando el correo')
  }
}
