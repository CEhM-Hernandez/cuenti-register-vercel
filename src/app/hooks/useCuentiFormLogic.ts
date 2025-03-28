import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useTransition, useEffect } from 'react'
import useFormHandlers from './useRegisterFormHandler'

export function useCuentiFormLogic() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultEmail = searchParams.get('e') || ''
  const tokenStatus = searchParams.get('token')
  const code = searchParams.get('codigo')
  const expiredToken = tokenStatus === 'expired'

  const [allyName, setAllyName] = useState<number | null>(null)
  const [allyCode, setAllyCode] = useState<number>(1)
  const { errors, handleSubmit, infoMessage } = useFormHandlers()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (expiredToken) {
      const timer = setTimeout(() => {
        router.replace('/', { scroll: false })
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [expiredToken, router])

  useEffect(() => {
    if (code) {
      const parsedId = parseInt(code)
      if (!isNaN(parsedId)) {
        fetch(
          `https://api.cuenti.co/jServerj4ErpPro//com/j4ErpPro/server/api_sin_token/consultarVendedorCode/${parsedId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              accept: 'application/json',
            },
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data) && data.length > 0 && data[0].nombre) {
              setAllyName(data[0].nombre)
              setAllyCode(parsedId)
            } else {
              router.replace('/', { scroll: false })
            }
          })
          .catch((error) => {
            console.error('Error fetching vendor info:', error)
            router.replace('/', { scroll: false })
          })
      } else {
        router.replace('/', { scroll: false })
      }
    }
  }, [code, router])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(() => handleSubmit(e))
  }

  const message = expiredToken
    ? {
        title: 'Verifica tu correo electrónico',
        message:
          'El enlace de verificación ha expirado, hemos enviado uno nuevo a tu correo',
      }
    : infoMessage

  const globalErrors = Object.fromEntries(
    Object.entries(errors).filter(([key, _]) => key === 'global'),
  )

  return {
    defaultEmail,
    allyName,
    allyCode,
    message,
    onSubmit,
    errors,
    isPending,
    globalErrors,
  }
}
