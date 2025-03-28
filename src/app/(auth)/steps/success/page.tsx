import Success from '@/app/ui/components/Success'
import { siteConfig } from '@/config'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...siteConfig.pages.succes,
}

export default function Page() {
  return <Success />
}
