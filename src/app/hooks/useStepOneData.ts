'use client'

import { useState, useEffect, useTransition } from 'react'
import fetchActivities from '@/app/services/fetchActivities'
import { fetchStepOneData } from '@lib/actions/fetchStepData'
import type { Option } from '@/types'

export function useStepOneData() {
  const [dbData, setDbData] = useState<any>(null)
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [otherBusiness, setOtherBusiness] = useState<string>('')
  const [options, setOptions] = useState<Option[]>([])
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    async function fetchOptions() {
      try {
        const fetchedOptions = await fetchActivities()
        const sortedOptions = fetchedOptions.sort((a: Option, b: Option) =>
          a.id === 11 ? 1 : b.id === 11 ? -1 : 0,
        )
        startTransition(() => {
          setOptions(sortedOptions)
        })
      } catch (error) {
        console.error('Error fetching activities:', error)
      }
    }
    fetchOptions()
  }, [startTransition])

  useEffect(() => {
    async function getDbData() {
      try {
        const data = await fetchStepOneData()
        startTransition(() => {
          setDbData(data)
        })
      } catch (error) {
        console.error('Error fetching step one data:', error)
      }
    }
    getDbData()
  }, [startTransition])

  useEffect(() => {
    startTransition(() => {
      if (dbData?.business_type) {
        setSelectedValue(dbData.business_type)
      }
      if (dbData?.other_business) {
        setOtherBusiness(dbData.other_business)
      }
    })
  }, [dbData, startTransition])

  return {
    selectedValue,
    otherBusiness,
    setSelectedValue,
    options,
    isPending,
  }
}
