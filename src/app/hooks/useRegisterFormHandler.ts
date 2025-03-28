'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useFormValidation from '@hooks/useRegisterFormValidation'
import { loginAction, registerAction } from '@lib/actions/auth-actions'

type FormDataType = {
  email: string
  password: string
  isAceptedTerms: boolean
  allyCode: number
}

export default function useFormHandlers() {
  const { errors, setErrors, validate } = useFormValidation()
  const [infoMessage, setInfoMessage] = useState<
    { title: string; message: string } | undefined
  >()
  const router = useRouter()

  const handleErrors = async (
    error: any,
    formData: FormDataType,
  ): Promise<{
    newErrors?: { [key: string]: string }
    newInfoMessage?: { title: string; message: string }
  }> => {
    setErrors({})
    setInfoMessage(undefined)

    if (Array.isArray(error)) {
      const newErrors = Object.assign({}, ...error)
      return { newErrors }
    }

    switch (error.name) {
      case 'EmailNotVerifiedError': {
        return {
          newInfoMessage: {
            title: error.title || 'Verifica tu correo electrónico',
            message: error.message,
          },
        }
      }
      case 'IncorrectPasswordError':
        return { newErrors: { global: error.message } }

      case 'AccountAlreadyExistsError':
        return { newErrors: { global: error.message } }

      case 'NotFoundError': {
        try {
          const registerRes = await registerAction(formData)
          if (registerRes.error) {
            return await handleErrors(registerRes.error, formData)
          } else {
            router.push('/steps')
          }
        } catch (regError: any) {
          return await handleErrors(regError, formData)
        }
        break
      }
      default:
        return {
          newErrors: {
            email:
              error.message ||
              'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
          },
        }
    }
    return {}
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setErrors({})
    setInfoMessage(undefined)

    let newErrorsLocal: { [key: string]: string } = {}
    let newInfoMessageLocal: { title: string; message: string } | undefined

    try {
      newErrorsLocal = {}
      newInfoMessageLocal = undefined

      const rawFormData = new FormData(e.currentTarget)
      const formData: FormDataType = {
        email: rawFormData.get('email')?.toString() || '',
        password: rawFormData.get('password')?.toString() || '',
        isAceptedTerms: rawFormData.get('isAceptedTerms') === 'true',
        allyCode: parseInt(rawFormData.get('allyCode')?.toString() || '1'),
      }

      const validationErrors = validate(formData)
      if (Object.keys(validationErrors).length > 0) {
        newErrorsLocal = validationErrors
        return
      }

      const res = await loginAction(
        formData.email,
        formData.password,
        formData.isAceptedTerms,
      )

      if (res.error) {
        const { newErrors, newInfoMessage } = await handleErrors(
          res.error,
          formData,
        )
        newErrorsLocal = newErrors || {}
        newInfoMessageLocal = newInfoMessage
        return
      }

      router.push('/steps')
    } catch (error: any) {
      console.error('Error inesperado:', error)
      newErrorsLocal = {
        email: 'Ocurrió un error inesperado. Por favor, intenta nuevamente.',
      }
    } finally {
      setErrors(newErrorsLocal)
      setInfoMessage(newInfoMessageLocal)
    }
  }

  return {
    errors,
    handleSubmit,
    infoMessage,
    setErrors,
    setInfoMessage,
  }
}
