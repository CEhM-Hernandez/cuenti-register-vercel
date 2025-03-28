import { Button, cn } from '@heroui/react'

import ChevronRight from '@icons/ChevronRight'
import ChevronLeft from '@icons/ChevronLeft'

interface StepNavigationProps {
  step: number
  loading: boolean
  TotalSteps: {
    id: number
    title: React.ReactNode
    description: string
    imgUrl: string
  }[]
  prevStep: () => void
}

export function StepNavigation({
  step,
  prevStep,
  TotalSteps,
  loading,
}: StepNavigationProps) {
  const isLastStep = step === TotalSteps.length

  return (
    <div
      className={`min-h-14 absolute bottom-0 right-0 p-4 md:py-4 md:px-12 flex w-full gap-4 ${step === 1 ? 'justify-end' : 'justify-between'}`}
    >
      {step > 1 && (
        <Button
          onPress={prevStep}
          variant="solid"
          startContent={<ChevronLeft className="size-6 sm-hidden" />}
          className="bg-transparent text-cuenti-dark-blue font-bold gap-1 text-base data-[hover=true]:bg-cuenti-green data-[hover=true]:text-white data-[hover=true]:!opacity-100 group px-4 py-3 m-0 md:w-52 w-36 h-14"
        >
          Atrás
        </Button>
      )}
      {
        <Button
          type="submit"
          form="steps"
          isIconOnly={loading}
          isLoading={loading}
          endContent={!isLastStep && <ChevronRight className="size-6" />}
          className={cn(
            'text-white font-bold text-base px-4 py-3 m-0 md:w-52 w-36 h-14 data-[hover=true]:bg-cuenti-green data-[hover=true]:!opacity-100 self-end',
            isLastStep
              ? 'bg-gradient-to-br from-cuenti-dark-blue from-20% via-cuenti-blue via-60% to-cuenti-blue to-80% hover:!bg-gradient-to-tr data-[focus-visible=true]:!outline-none data-[focus-visible=true]:!shadow-[inset_0px_6px_8px_rgba(0,0,0,0.25),_inset_0px_-6px_8px_rgba(0,0,0,0.25)]'
              : 'gap-1 bg-cuenti-dark-blue',
          )}
        >
          {isLastStep ? 'Finalizar' : 'Continuar'}
        </Button>
      }
    </div>
  )
}
