import { UserData } from '@/types'

export async function sendDataToDb(data: Partial<UserData>) {
  try {
    const res = await fetch('/api/updateUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return res.json()
  } catch (error) {
    console.error('Error al enviar datos a la base de datos:', error)
    throw new Error('Error al enviar datos a la base de datos')
  }
}
