'use client'

import { createContext, useContext, useState } from 'react'
import type { TotalSteps as TotalStepsType } from '@/types'
import { TotalSteps } from '@/config/TotalSteps'

interface StepContextType {
  step: number
  setStep: (step: number) => void
  TotalSteps: TotalStepsType
}

const StepContext = createContext<StepContextType | undefined>(undefined)

interface StepProviderProps {
  children: React.ReactNode
  initialStep?: number
}

export function StepProvider({ children, initialStep = 1 }: StepProviderProps) {
  const [step, setStep] = useState(initialStep)

  return (
    <StepContext.Provider value={{ step, setStep, TotalSteps }}>
      {children}
    </StepContext.Provider>
  )
}

export function useStep() {
  const context = useContext(StepContext)
  if (!context) {
    throw new Error('useStep debe usarse dentro de un StepProvider')
  }
  return context
}
