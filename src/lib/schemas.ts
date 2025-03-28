import { z } from 'zod'

export const credentialsRegisterSchema = z.object({
  email: z
    .string({ required_error: 'El correo es requerido' })
    .email('Correo electrónico incorrecto/no válido'),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  isAceptedTerms: z
    .boolean({
      required_error: 'Debes aceptar los términos y condiciones para continuar',
    })
    .or(
      z.string().refine((val) => val === 'true', {
        message: 'Debes aceptar los términos y condiciones para continuar',
      }),
    ),
})
