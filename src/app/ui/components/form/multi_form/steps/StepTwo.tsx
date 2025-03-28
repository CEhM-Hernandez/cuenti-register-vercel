'use client'

import { Skeleton } from '@heroui/react'

import { useStepTwoData } from '@hooks/useStepTwoData'

import CuentiInput from '@components/form/CuentiInput'

import type { ErrorFields } from '@/types'

export default function StepTwo({ errors }: { errors: ErrorFields }) {
  const { lastname, name, isPending } = useStepTwoData()

  if (isPending) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <span className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </span>
        <span className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24 rounded-lg" />
          <Skeleton className="h-12 rounded-lg" />
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <CuentiInput
        label="¿Cómo te llamas?"
        defaultValue={name || ''}
        placeholder="Ingresa tu nombre completo"
        autocomplete="true"
        classNames={{ inputWrapper: ['border-cuenti-dark-blue'] }}
        name="name"
        type="text"
        required
        isRequired
        isInvalid={!!errors.name || !!errors.nameAndLastname}
        errorMessage={errors.name || 'Ingresa tu nombre'}
        validationBehavior="aria"
      />
      <CuentiInput
        label="¿Cuál es tu apellido?"
        defaultValue={lastname || ''}
        placeholder="Ingresa tu apellido"
        autocomplete="true"
        classNames={{ inputWrapper: ['border-cuenti-dark-blue'] }}
        name="lastname"
        type="text"
        isInvalid={!!errors.lastname || !!errors.nameAndLastname}
        errorMessage={errors.lastname || 'Ingresa tu apellido'}
        validationBehavior="aria"
      />
    </div>
  )
}
