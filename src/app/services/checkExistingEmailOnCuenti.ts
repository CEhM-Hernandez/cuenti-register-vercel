export async function checkExistingEmailOnCuenti(
  email: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      'https://api.cuenti.co/jServerj4ErpPro/j4pro/admin/usuario/validar_email',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: email.toString(),
      },
    )

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error al validar email: ', error)
    return false
  }
}
