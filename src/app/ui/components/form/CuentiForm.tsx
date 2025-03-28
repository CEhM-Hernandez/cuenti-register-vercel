'use client'

import { Button, Form } from '@heroui/react'

import CuentiInput from '@components/form/CuentiInput'
import CuentiPassword from '@components/form/CuentiPassword'
import { TermsCheckbox } from '@components/form/Terms'
import { FormAlert } from '@components/form/multi_form/FormAlert'
import { useCuentiFormLogic } from '@hooks/useCuentiFormLogic'

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export default function CuentiForm() {
  const {
    defaultEmail,
    allyName,
    allyCode,
    message,
    onSubmit,
    errors,
    isPending,
    globalErrors,
  } = useCuentiFormLogic()

  return (
    <>
      {!isPending && (
        <FormAlert
          errors={globalErrors}
          infoMessage={message}
          className="!-top-28 md:!-top-20"
        />
      )}
      {allyName && (
        <div className="absolute top-0 w-full text-center">
          <span className="bg-cuenti-blue py-2 px-4 rounded-b-2xl font-quicksand font-bold text-white">
            {allyName}
          </span>
        </div>
      )}
      <Form
        className="w-full flex flex-col gap-6"
        onSubmit={onSubmit}
        validationBehavior="aria"
        validationErrors={errors}
      >
        <CuentiInput
          type="email"
          label="Tu correo"
          name="email"
          placeholder="Ingresa tu correo"
          autoComplete="true"
          defaultValue={defaultEmail}
          validate={(value: string) => {
            if (!value) return
            if (!EMAIL_REGEX.test(value))
              return 'Correo electrónico incorrecto/no válido'
          }}
        />
        <CuentiPassword />
        <SubmitButton loading={isPending} />
        <TermsValidation errors={errors} />
        <input type="hidden" name="allyCode" value={allyCode} />
      </Form>
    </>
  )
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <Button
      className="w-full text-white bg-gradient-to-br from-cuenti-dark-blue from-20% via-cuenti-blue via-60% to-cuenti-blue to-80% h-14 text-base font-bold hover:!opacity-100 hover:!bg-gradient-to-tr data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!shadow-[inset_0px_6px_8px_rgba(0,0,0,0.25),_inset_0px_-6px_8px_rgba(0,0,0,0.25)]"
      type="submit"
      isLoading={loading}
      isIconOnly={loading}
    >
      Crear cuenta
    </Button>
  )
}

function TermsValidation({ errors }: { errors: Record<string, any> }) {
  const isInvalid = !!errors.isAceptedTerms
  return (
    <div className="flex flex-col gap-2">
      <TermsCheckbox isInvalid={isInvalid} />
      {isInvalid && (
        <div className="text-danger text-small text-center">
          {errors.isAceptedTerms}
        </div>
      )}
    </div>
  )
}
