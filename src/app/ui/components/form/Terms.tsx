import { useState } from 'react'

import { Checkbox, Link } from '@heroui/react'

export function TermsCheckbox({ isInvalid }: { isInvalid: boolean }) {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (checked: boolean) => {
    setIsChecked(checked)
  }

  return (
    <label className="flex items-center justify-center gap-2 mt-1 w-full">
      <Checkbox
        isSelected={isChecked}
        onValueChange={handleChange}
        id="termsAndConditions"
        name="isAceptedTerms"
        radius="sm"
        size="md"
        isInvalid={isInvalid}
        validationBehavior="aria"
        isRequired
        value="true"
        aria-labelledby="termsAndConditions"
      />
      <p className="text-sm w-full">
        Al crear tu cuenta aceptas nuestros{' '}
        <Link
          href="https://www.j4pro.com/wp-content/uploads/T%C3%A9rminos-y-Condicones.pdf"
          tabIndex={-1}
          className="text-cuenti-blue text-sm"
          underline="always"
          isExternal
        >
          Términos, Condiciones
        </Link>{' '}
        y{' '}
        <Link
          href="https://cuenti.com/wp-content/uploads/2023/09/POLITICA-DE-PRIVACIDAD-Y-DE-PROTECCION-DE-DATOS-PERSONALES-DE-GRUPO-SEJEL.pdf"
          tabIndex={-1}
          className="text-cuenti-blue text-sm"
          underline="always"
          isExternal
        >
          Política de Tratamiento de Datos. Incluido el uso de cookies.
        </Link>
      </p>
    </label>
  )
}
