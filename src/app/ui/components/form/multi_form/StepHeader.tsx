import { Image } from '@heroui/react'

import { TotalSteps } from '@/types'

interface StepHeaderProps {
  step: number
  TotalSteps: TotalSteps
}

export function StepHeader({ step, TotalSteps }: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full">
      <span className="flex w-full items-center gap-2">
        <Image
          key={TotalSteps[step - 1].id}
          alt={TotalSteps[step - 1].description}
          src={TotalSteps[step - 1].imgUrl}
          className="min-w-20 min-h-20 size-20"
        />
        <h1 className="font-rubik font-bold text-xl md:text-3xl text-cuenti-dark-blue w-full p-0 m-0">
          {TotalSteps[step - 1].title}
        </h1>
      </span>

      <p className="text-pretty px-8">{TotalSteps[step - 1].description}</p>
    </div>
  )
}
