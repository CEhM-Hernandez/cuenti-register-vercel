import { Radio } from '@heroui/react'

export function ActivityRadio({
  children,
  value,
  isSelected,
  onClick,
}: {
  children: React.ReactNode
  value: string
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <Radio
      onClick={onClick}
      value={value}
      name={value}
      classNames={{
        base: [
          'group',
          'overflow-hidden',
          'flex gap-1 w-full max-w-md h-14',
          'items-center justify-start',
          'cursor-pointer rounded-[15px] p-0 m-0',
          'data-[selected=true]:border-cuenti-green',
          'border-2 border-solid border-cuenti-dark-blue',
          'hover:border-cuenti-green',
        ],
        label: [
          'mx-4 flex gap-4 items-center justify-center',
          'group-hover:text-cuenti-green',
          isSelected ? 'text-cuenti-green' : '',
        ],
        wrapper: ['hidden'],
      }}
    >
      {children}
    </Radio>
  )
}
