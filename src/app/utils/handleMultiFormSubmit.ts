import parsePhoneNumberFromString, { CountryCode } from 'libphonenumber-js'

import { UserData, ErrorFields } from '@/types'
import { sendDataToDb } from '@services/sendDataToDb'
import { sendDataToCuenti } from '../services/sendDataToCuenti'
import { TotalSteps } from '@/config/TotalSteps'

export async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  step: number,
  nextStep: () => void,
  setErrors: (errors: { [key: string]: string }) => void,
): Promise<void> {
  e.preventDefault()

  const formData = new FormData(e.currentTarget)
  const { newData, stepErrors } = validateData(formData, step)

  if (Object.keys(stepErrors).length > 0) {
    setErrors(stepErrors)
    return
  }

  setErrors({})

  try {
    const res = await sendDataToDb(newData)

    if (!res) {
      setErrors({
        general: 'Ocurrió un error al enviar los datos. Intenta de nuevo.',
      })
      return
    }

    if (step === TotalSteps.length) {
      const cuentiRes = await sendDataToCuenti()

      if (!cuentiRes || cuentiRes.error) {
        const message = (cuentiRes.message as string).split(':')[3]

        setErrors({
          general:
            message ||
            'Ocurrió un error al enviar los datos a Cuenti. Intenta de nuevo.',
        })
        return
      }
    }

    nextStep()
  } catch (error) {
    console.error('Error al enviar datos a la base de datos:', error)
    setErrors({
      general: 'Ocurrió un error al enviar los datos. Intenta de nuevo.',
    })
  }
}

function validateData(formData: FormData, step: number) {
  const data = Object.fromEntries(formData.entries()) as unknown as UserData
  const stepErrors: ErrorFields = {}
  const newData: UserData = { ...data, step }

  switch (step) {
    case 1: {
      if (!data.businessType) {
        stepErrors.businessType = 'Selecciona una actividad'
      }

      if (data.otherBusiness === '') {
        stepErrors.otherBusiness =
          'Escribe una actividad o sector que describa tu negocio'
      } else if (data.otherBusiness && data.otherBusiness.trim().length < 5) {
        stepErrors.otherBusiness = 'El sector debe tener al menos 5 caracteres'
      } else if (data.otherBusiness && data.otherBusiness.trim().length > 30) {
        stepErrors.otherBusiness = 'El sector debe tener máximo 30 caracteres'
      } else {
        const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/
        if (data.otherBusiness && !regex.test(data.otherBusiness.trim())) {
          stepErrors.otherBusiness =
            'La actividad solo debe contener letras y espacios. Por favor, elimina números y caracteres especiales.'
        }
      }

      break
    }
    case 2: {
      const name = data.name.trim()
      const lastname = data.lastname.trim()

      if (!name && !lastname) {
        stepErrors.nameAndLastname = 'Ingresa tu nombre y apellido'
      } else {
        if (!name) stepErrors.name = 'Ingresa tu nombre'
        if (!lastname) stepErrors.lastname = 'Ingresa tus apellidos'
      }
      break
    }
    case 3: {
      if (!data.countryCode) {
        stepErrors.countryCode = 'Selecciona un país'
      }

      const phoneInput = data.phoneNumber ? data.phoneNumber.trim() : ''
      if (!phoneInput) {
        stepErrors.phoneNumber = 'Ingresa tu número de teléfono'
      } else if (data.countryCode) {
        try {
          const parsedPhone = parsePhoneNumberFromString(
            phoneInput,
            data.countryCode.toUpperCase() as CountryCode,
          )
          if (!parsedPhone || !parsedPhone.isValid()) {
            stepErrors.phoneNumber = 'Número de teléfono inválido'
          } else {
            newData.phoneNumber = parsedPhone.format('E.164')
          }
        } catch (error) {
          console.error('Error al parsear el número de teléfono:', error)
          stepErrors.phoneNumber = 'Error al procesar el número de teléfono'
        }
      }
      break
    }

    default:
      break
  }

  return { stepErrors, newData }
}
