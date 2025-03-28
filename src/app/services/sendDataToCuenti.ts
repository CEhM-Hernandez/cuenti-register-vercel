export async function sendDataToCuenti() {
  try {
    const res = await fetch('/api/sendDataToCuenti', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const response = await res.json()

    console.log('response:', response)

    return response
  } catch (error: any) {
    console.error('Error al enviar datos a la base de datos de CUENTI:', error)
    throw new Error((error as string).toString())
  }
}
