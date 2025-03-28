'use client'

import { useState, useEffect } from 'react'
import { Country } from '@/types'
import { useCountries } from './useCountries'
import { usePhoneNumber } from './usePhoneNumber'

export function useDefaultCountry() {
  const { countries } = useCountries()
  const [defaultCountry, setDefaultCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [department, setDepartment] = useState('')

  useEffect(() => {
    async function fetchUserCountry() {
      try {
        const res = await fetch('https://geo-api.cuenti.co/get_ipdata')
        if (!res.ok) throw new Error('Error al obtener la geolocalización')
        const data = await res.json()
        const code = data.country.toLowerCase()
        setCity(data.city)
        setDepartment(data.region)
        const foundCountry = countries.find((c) => c.countryCode === code)
        setDefaultCountry(
          foundCountry || { countryCode: 'co', countryName: 'Colombia' },
        )
      } catch (error) {
        console.error('Error al obtener el país del usuario:', error)
        setDefaultCountry({ countryCode: 'co', countryName: 'Colombia' })
      } finally {
        setLoading(false)
      }
    }
    if (countries.length > 0) {
      fetchUserCountry()
    }
  }, [countries])

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)

  useEffect(() => {
    if (defaultCountry) {
      setSelectedCountry(defaultCountry)
    }
  }, [defaultCountry])

  const validCountry: Country = selectedCountry ||
    defaultCountry || { countryCode: 'co', countryName: 'Colombia' }
  const { phonePrefix, handlePhoneChange, phoneNumber } = usePhoneNumber({
    country: validCountry,
  })

  return {
    city,
    department,
    loading,
    defaultCountry,
    selectedCountry,
    phonePrefix,
    handlePhoneChange,
    phoneNumber,
    setSelectedCountry,
  }
}
