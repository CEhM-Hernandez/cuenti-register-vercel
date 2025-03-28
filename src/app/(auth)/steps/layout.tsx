import { StepProvider } from '@/app/context/StepContext'
import { getStep } from '@lib/actions/auth-actions'

export default async function StepLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const step = await getStep()

  return (
    <StepProvider initialStep={step}>
      <main className="bg-step bg-no-repeat bg-center bg-cover w-screen h-svh">
        <span className="w-full h-full flex justify-center items-center overflow-hidden backdrop-blur-[3px] backdrop-contrast-[.7]">
          {children}
        </span>
      </main>
    </StepProvider>
  )
}
