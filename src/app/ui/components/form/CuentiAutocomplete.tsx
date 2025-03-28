'use client'

import { Country } from '@/types'

import { Autocomplete, AutocompleteItem, Avatar } from '@heroui/react'

import { useCountries } from '@hooks/useCountries'

interface CuentiAutocompleteProps {
  setSelectedCountry: (country: Country) => void
  selectedCountry: Country
  defaultCountry: Country
}

export function CuentiAutocomplete({
  defaultCountry,
  setSelectedCountry,
  selectedCountry,
}: CuentiAutocompleteProps) {
  const { countries } = useCountries()

  return (
    <Autocomplete
      isVirtualized
      validationBehavior="aria"
      id="countryCode"
      name="countryCode"
      aria-labelledby="countryCode"
      showScrollIndicators
      defaultItems={countries}
      defaultSelectedKey={defaultCountry.countryCode}
      isClearable={false}
      radius="none"
      variant="bordered"
      classNames={{
        listboxWrapper: ['max-h-fit'],
        base: ['max-w-40', 'custom-autocomplete'],
      }}
      listboxProps={{
        emptyContent: 'No se encontraron resultados',
      }}
      onInputChange={(value) => {
        if (!value) {
          setSelectedCountry({ countryCode: '', countryName: '' })
        } else {
          const country = countries.find((c: any) => c.countryName === value)
          setSelectedCountry(
            country || {
              countryCode: selectedCountry.countryCode,
              countryName: '',
            },
          )
        }
      }}
      startContent={
        selectedCountry.countryCode && selectedCountry.countryName ? (
          <Avatar
            alt={`bandera de ${selectedCountry.countryName}`}
            radius="full"
            className="min-w-6 max-w-6 h-6"
            src={`https://flagcdn.com/${selectedCountry.countryCode}.svg`}
          />
        ) : null
      }
    >
      {(item: Country) => (
        <AutocompleteItem
          key={item.countryCode}
          startContent={
            <Avatar
              alt={`bandera de ${item.countryName}`}
              radius="full"
              className="min-w-6 max-w-6 h-6"
              src={`https://flagcdn.com/${item.countryCode}.svg`}
            />
          }
        >
          {item.countryName}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
