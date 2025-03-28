import { TotalSteps } from '@/types'

export const updateStepInDB = async ({
  newStep,
  TotalSteps,
}: {
  newStep: number
  TotalSteps: TotalSteps
}) => {
  try {
    await fetch('/api/updateStep', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step: newStep, maxSteps: TotalSteps.length }),
    })
  } catch (error) {
    console.error('Error actualizando el step en la DB:', error)
  }
}
