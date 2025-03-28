'use client'

import { Image, RadioGroup, Skeleton } from '@heroui/react'

import { useStepOneData } from '@hooks/useStepOneData'

import { ActivityRadio } from '@components/form/CuentiRadio'
import CuentiInput from '@components/form/CuentiInput'

import type { ActivityOptionProps } from '@/types'

function ActivityOption({
  option,
  selectedValue,
  onSelect,
  otherBusiness,
}: ActivityOptionProps) {
  const isSelected = selectedValue === option.value

  return (
    <>
      <ActivityRadio
        value={option.value}
        isSelected={isSelected}
        onClick={() => onSelect(option.value)}
      >
        <Image
          src={`https://cuenti.com/cdn/form-register/bussines_type/${option.icon}`}
          alt={`icono del sector ${option.value}`}
          width={42}
          height={42}
        />
        {option.value}
      </ActivityRadio>
      {option.id === 11 && isSelected && (
        <CuentiInput
          label="Sector que mejor describe tu negocio"
          name="otherBusiness"
          defaultValue={otherBusiness || ''}
          placeholder="Sector que mejor describe tu negocio"
          type="text"
          isRequired
          required
          validate={(value: string) => {
            if (!isSelected) return
            if (!value.trim()) return
            if (value.trim().length < 5) {
              return 'El sector debe tener al menos 5 caracteres'
            }
            if (value.trim().length > 30) {
              return 'El sector debe tener máximo 30 caracteres'
            }
            if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(value.trim())) {
              return 'La actividad solo debe contener letras y espacios. Por favor, elimina números y caracteres especiales.'
            }
          }}
          minLength={3}
          maxLength={30}
          autocomplete="true"
          disabled={!isSelected}
          classNames={{ inputWrapper: ['border-cuenti-dark-blue'] }}
        />
      )}
    </>
  )
}

export default function StepOne() {
  const { selectedValue, otherBusiness, setSelectedValue, options, isPending } =
    useStepOneData()

  if (isPending) {
    return (
      <div className="flex flex-col gap-6 w-full items-center justify-center px-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="max-w-md w-full h-12 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <RadioGroup
      value={selectedValue}
      validationBehavior="aria"
      onValueChange={setSelectedValue}
      classNames={{
        base: ['w-full', 'items-center', 'p-0 pr-2', 'sm:pr-0', 'static'],
        wrapper: ['gap-4', 'static', 'max-w-sm', 'w-full'],
        errorMessage: ['hidden'],
      }}
      isRequired
      name="businessType"
    >
      {options.map((option) => (
        <ActivityOption
          key={option.id}
          option={option}
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
          otherBusiness={otherBusiness}
        />
      ))}
    </RadioGroup>
  )
}
