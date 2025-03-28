'use client'

import { useState } from 'react'

import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'

import CuentiInput from '@components/form/CuentiInput'
import EyeSlashIcon from '@icons/EyeSlashIcon'
import EyeIcon from '@icons/EyeIcon'
import InfoIcon from '@icons/InfoIcon'

function PasswordLabel() {
  return (
    <span className="flex justify-between items-center gap-1">
      Tu contraseña
      <Popover placement="right-start">
        <PopoverTrigger>
          <Button
            isIconOnly
            className="bg-transparent hover:bg-transparent !outline-none max-h-6"
            tabIndex={-1}
            radius="full"
          >
            <InfoIcon className="size-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-[#E5E5EA] max-w-[145px] p-2 text-sm leading-4 text-balance border-none shadow-none">
          <p>
            Tu contraseña debe tener mínimo{' '}
            <span className="font-bold">6 caracteres.</span>
          </p>
        </PopoverContent>
      </Popover>
    </span>
  )
}

function ShowPasswordButton({
  isShowPassword,
  setShowPassword,
}: {
  isShowPassword: boolean
  setShowPassword: any
}) {
  return (
    <Button
      tabIndex={-1}
      aria-label="Mostrar/ocultar contraseña"
      className="focus:outline-none bg-transparent hover:bg-transparent"
      onPress={() => setShowPassword((prev: any) => !prev)}
      isIconOnly
    >
      {isShowPassword ? <EyeSlashIcon /> : <EyeIcon />}
    </Button>
  )
}

export default function CuentiPassword() {
  const [isShowPassword, setShowPassword] = useState(false)
  const [value, setValue] = useState('')

  return (
    <CuentiInput
      label={<PasswordLabel />}
      name="password"
      placeholder="Ingresa tu contraseña"
      type={isShowPassword ? 'text' : 'password'}
      autocomplete="true"
      validate={(value: string) => {
        if (!value) return
        if (value.length < 6)
          return 'La contraseña debe tener al menos 6 caracteres'
      }}
      endContent={
        <ShowPasswordButton
          isShowPassword={isShowPassword}
          setShowPassword={setShowPassword}
        />
      }
      onValueChange={setValue}
      classNames={{
        input: !isShowPassword && value ? ['text-2xl', 'tracking-widest'] : [],
      }}
    />
  )
}
