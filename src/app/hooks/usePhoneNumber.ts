import { useState, useMemo, useCallback, useEffect } from 'react'
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from 'libphonenumber-js/mobile'

interface Country {
  countryCode: string
  countryName: string
}

interface UsePhoneNumberProps {
  country: Country
}

export function usePhoneNumber({ country }: UsePhoneNumberProps) {
  const { countryCode } = country
  const normalizedCountryCode = useMemo(
    () => countryCode.toUpperCase() as CountryCode,
    [countryCode],
  )

  const [phoneNumber, setPhoneNumber] = useState('')

  const phonePrefix = useMemo(() => {
    try {
      const prefix = getCountryCallingCode(normalizedCountryCode)
      return `+${prefix}`
    } catch (error) {
      console.error(
        `Error obteniendo prefijo para ${normalizedCountryCode}:`,
        error,
      )
      return ''
    }
  }, [normalizedCountryCode])

  const handlePhoneChange = useCallback(
    (value: string) => {
      const formatter = new AsYouType(normalizedCountryCode)
      const formattedNumber = formatter.input(value)
      setPhoneNumber(formattedNumber)
    },
    [normalizedCountryCode],
  )

  const isValid = useMemo(() => {
    if (!phoneNumber) return false
    try {
      const parsed = parsePhoneNumberFromString(
        phoneNumber,
        normalizedCountryCode,
      )
      return parsed ? parsed.isValid() : false
    } catch (error) {
      console.error('Error validando el número de teléfono:', error)
      return false
    }
  }, [phoneNumber, normalizedCountryCode])

  useEffect(() => {
    setPhoneNumber('')
  }, [normalizedCountryCode])

  const resetPhoneNumber = useCallback(() => {
    setPhoneNumber('')
  }, [])

  return {
    phoneNumber,
    phonePrefix,
    handlePhoneChange,
    isValid,
    resetPhoneNumber,
  }
}
