import { useState } from 'react'

export default function useFormValidation() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validate = (data: any) => {
    setErrors({})
    let newErrors: { [key: string]: string } = {}

    if (!data.email) {
      newErrors.email = 'El correo es requerido'
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email as string)) {
      newErrors.email = 'Correo electrónico incorrecto/no válido'
    }

    if (!data.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (data.password.toString().length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!data.isAceptedTerms) {
      newErrors.isAceptedTerms =
        'Debes aceptar los términos y condiciones para continuar'
    }

    return newErrors
  }

  return { errors, setErrors, validate }
}
