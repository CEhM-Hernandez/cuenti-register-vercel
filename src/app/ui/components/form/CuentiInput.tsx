'use client'

import { useState } from 'react'

import { Input } from '@heroui/react'

import type { CuentiInputProps } from '@/types'

export default function CuentiInput({
  label,
  name,
  type,
  placeholder,
  autocomplete,
  classNames,
  disabled,
  ...props
}: CuentiInputProps) {
  const [value, setValue] = useState('')

  return (
    <Input
      disabled={disabled || false}
      label={label}
      classNames={{
        input: [
          'text-base',
          'leading-4',
          'placeholder:text-base',
          '!text-black',
          classNames?.input,
        ],
        inputWrapper: [
          'h-14',
          'rounded-[15px]',
          'border-cuenti-gray',
          'group-data-[hover=true]:!border-cuenti-light-blue',
          'data-[focus=true]:!border-cuenti-blue',
          disabled &&
            '!border-cuenti-gray data-[focus=true]:!border-cuenti-gray group-data-[hover=true]:!border-cuenti-gray',
          value && '!border-cuenti-light-blue',
          classNames?.inputWrapper,
        ],
        label: [
          'font-quicksand',
          'font-bold',
          'text-base',
          'pb-2',
          '!text-black',
          classNames?.label,
        ],
        errorMessage: ['font-normal', 'text-sm', classNames?.errorMessage],
      }}
      radius="none"
      labelPlacement="outside"
      name={name}
      placeholder={placeholder}
      variant="bordered"
      autoComplete={autocomplete}
      type={type}
      onChange={(e) => {
        setValue(e.currentTarget.value)
      }}
      {...props}
    />
  )
}
