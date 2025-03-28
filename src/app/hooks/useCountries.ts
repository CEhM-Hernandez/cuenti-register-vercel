'use client'

import { useEffect, useState } from 'react'
import { fetchCountryList } from '@/app/services/countries'
import { Country } from '@/types'

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    fetchCountryList().then((fetchedCountries) => {
      setCountries(fetchedCountries)
    })
  }, [])

  return { countries }
}
