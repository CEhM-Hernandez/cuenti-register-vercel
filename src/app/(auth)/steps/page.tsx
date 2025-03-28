import { Metadata } from 'next'
import { siteConfig } from '@/config'
import MultiStepWrapper from '@/app/ui/components/form/multi_form/MultiStepWrapper'
import { Suspense } from 'react'

export const metadata: Metadata = {
  ...siteConfig.pages.steps,
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <MultiStepWrapper />
    </Suspense>
  )
}
