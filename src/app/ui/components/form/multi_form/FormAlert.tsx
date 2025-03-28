'use client'

import { Alert } from '@heroui/react'
import { useAlert } from '@hooks/useAlert'

type AlertProps = {
  errors?: Record<string, string>
  successMessage?: { title: string; message: string }
  infoMessage?: { title: string; message: string }
  className?: string
}

export function FormAlert({
  errors = {},
  successMessage,
  infoMessage,
  className,
}: AlertProps) {
  const { visible, fading, message } = useAlert({
    errors,
    successMessage,
    infoMessage,
  })

  if (!visible || !message) return null

  const colorMap = {
    error: 'danger',
    success: 'success',
    info: 'default',
  } as const

  return (
    <div
      className={`absolute top-2 w-full right-1/2 translate-x-1/2 max-w-[calc(100%-1rem)] md:max-w-xl min-h-max transition-all z-50 ${
        fading ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300 ${className ? className : ''}`}
    >
      <Alert
        color={colorMap[message.type]}
        title={message.title}
        description={message.description}
        variant="solid"
        isClosable={true}
        classNames={{
          title: ['font-bold', 'text-md'],
          base: ['items-center'],
        }}
        className="mb-2 w-full"
      />
    </div>
  )
}
