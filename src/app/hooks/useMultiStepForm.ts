'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { useStep } from '@/app/context/StepContext'
import type { ErrorFields } from '@/types'
import { getStep } from '@lib/actions/auth-actions'

export function useMultiStepForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { TotalSteps } = useStep()

  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<ErrorFields>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      const dbStep = (await getStep()) ?? 1
      if (dbStep === TotalSteps.length + 1) return router.push('/steps/success')
      setStep(dbStep)
      router.replace(`?step=${dbStep}`, { scroll: false })
    })()
  }, [router])

  useEffect(() => {
    const urlStep = Number(searchParams.get('step')) || step
    if (urlStep < 1 || urlStep > TotalSteps.length) return
    setStep(urlStep)
  }, [searchParams, TotalSteps.length])

  const navigateToStep = useCallback(
    (newStep: number) => {
      if (newStep === TotalSteps.length + 1)
        return router.push('/steps/success')

      if (newStep < 1 || newStep > TotalSteps.length) return
      setStep(newStep)
      router.push(`?step=${newStep}`, { scroll: false })
    },
    [router, TotalSteps.length],
  )

  return {
    step,
    setStep: navigateToStep,
    TotalSteps,
    errors,
    setErrors,
    loading,
    setLoading,
    nextStep: () => navigateToStep(step + 1),
    prevStep: () => navigateToStep(step - 1),
  }
}
