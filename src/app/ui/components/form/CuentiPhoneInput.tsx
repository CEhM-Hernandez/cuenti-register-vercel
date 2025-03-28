import CuentiInput from '@components/form/CuentiInput'

interface PhoneInputProps {
  phoneNumber: string
  phonePrefix: string
  onPhoneChange: (value: string) => void
}

export function PhoneInput({
  phoneNumber,
  phonePrefix,
  onPhoneChange,
}: PhoneInputProps) {
  return (
    <CuentiInput
      name="phoneNumber"
      type="text"
      isRequired
      label="¿Cuál es tu número de celular?"
      labelPlacement="outside"
      placeholder="Número de teléfono"
      startContent={<span className="font-bold">{phonePrefix}</span>}
      variant="bordered"
      radius="none"
      value={phoneNumber}
      onValueChange={onPhoneChange}
      className="!m-0 static"
      classNames={{
        inputWrapper: [
          'border-cuenti-dark-blue !rounded-r-xl rounded-l-none',
          '!static',
        ],
        label: ['bottom-0', 'left-0', 'text-cuenti-dark-blue'],
        errorMessage: [],
      }}
    />
  )
}
