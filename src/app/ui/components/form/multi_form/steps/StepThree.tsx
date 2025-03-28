'use client'

import { Skeleton } from '@heroui/react'

import { useDefaultCountry } from '@hooks/useDefaultCountry'

import { CuentiAutocomplete } from '@components/form/CuentiAutocomplete'
import { PhoneInput } from '@components/form/CuentiPhoneInput'

import type { Country } from '@/types'

export default function StepThree() {
  const {
    defaultCountry,
    handlePhoneChange,
    loading,
    phoneNumber,
    phonePrefix,
    selectedCountry,
    setSelectedCountry,
    city,
    department,
  } = useDefaultCountry()

  if (loading || !defaultCountry || !selectedCountry) {
    return (
      <div className="flex w-full">
        <span className="flex flex-col w-full gap-4">
          <Skeleton className="w-32 h-6 rounded-lg" />
          <Skeleton className="w-full h-12 rounded-lg" />
        </span>
      </div>
    )
  }

  return (
    <div className="flex w-full mt-5 items-start relative">
      <CuentiAutocomplete
        defaultCountry={defaultCountry}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry as (c: Country) => void}
      />
      <PhoneInput
        phoneNumber={phoneNumber}
        phonePrefix={phonePrefix}
        onPhoneChange={handlePhoneChange}
      />
      <input
        type="hidden"
        name="countryName"
        value={selectedCountry.countryName}
      />
      <input
        type="hidden"
        name="countryCode"
        value={selectedCountry.countryCode}
      />
      <input type="hidden" name="phonePrefix" value={phonePrefix} />
      <input type="hidden" name="department" value={department} />
      <input type="hidden" name="city" value={city} />
    </div>
  )
}
