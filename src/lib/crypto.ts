const encoder = new TextEncoder()
const decoder = new TextDecoder()

async function getKey(): Promise<CryptoKey> {
  // La clave debe ser de 256 bits (32 bytes). Asegúrate de tenerla en el .env y convertirla a ArrayBuffer.
  const keyData = encoder.encode(process.env.SECRET_KEY!)
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt'],
  )
}

export async function encryptPassword(password: string): Promise<string> {
  const key = await getKey()
  // Para AES-GCM se recomienda un IV de 12 bytes.
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoder.encode(password),
  )
  // Convertir a hex para almacenarlo (concatenar IV y cifrado)
  const ivHex = Array.from(iv)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  const encryptedHex = Array.from(new Uint8Array(encryptedBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `${ivHex}:${encryptedHex}`
}

export async function decryptPassword(
  encryptedPassword: string,
): Promise<string> {
  const key = await getKey()
  const [ivHex, encryptedHex] = encryptedPassword.split(':')
  const iv = new Uint8Array(
    ivHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  )
  const encryptedBytes = new Uint8Array(
    encryptedHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  )
  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encryptedBytes,
  )
  return decoder.decode(decryptedBuffer)
}
