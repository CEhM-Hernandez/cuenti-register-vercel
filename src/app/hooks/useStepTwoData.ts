import { fetchStepTwoData } from '@lib/actions/fetchStepData'
import { useState, useEffect, useTransition } from 'react'

export function useStepTwoData() {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    async function getDbData() {
      try {
        const data = await fetchStepTwoData()

        if (!data) {
          return
        }

        const { name, lastname } = data

        startTransition(() => {
          setLastname(lastname || '')
          setName(name || '')
        })
      } catch (error) {
        console.error('Error fetching step two data:', error)
      }
    }

    getDbData()
  }, [startTransition])

  return { name, lastname, isPending }
}
