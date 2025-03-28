import { useState, useEffect } from 'react'
import { ErrorFields } from '@/types'

type AlertMessage = {
  type: 'error' | 'success' | 'info'
  title: string
  description: string
}

type UseAlertParams = {
  errors?: ErrorFields
  successMessage?: { title: string; message: string }
  infoMessage?: { title: string; message: string }
}

export function useAlert({
  errors,
  successMessage,
  infoMessage,
}: UseAlertParams) {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null)

  const computeMessage = (): AlertMessage | null => {
    if (errors && Object.keys(errors).length > 0) {
      return {
        type: 'error',
        title: '¡Error!',
        description: Object.values(errors).join(' '),
      }
    }
    if (successMessage?.message) {
      return {
        type: 'success',
        title: successMessage.title || 'Éxito',
        description: successMessage.message,
      }
    }
    if (infoMessage?.message) {
      return {
        type: 'info',
        title: infoMessage.title || 'Información',
        description: infoMessage.message,
      }
    }
    return null
  }

  useEffect(() => {
    const message = computeMessage()

    if (message) {
      setAlertMessage(message)
      setVisible(true)
      setFading(true)
      const duration = message.type === 'info' ? 5000 : 3000
      const timeout = setTimeout(() => setFading(false), duration)
      return () => clearTimeout(timeout)
    } else {
      setVisible(false)
      setAlertMessage(null)
    }
  }, [errors, successMessage, infoMessage])

  return { visible, fading, message: alertMessage }
}
