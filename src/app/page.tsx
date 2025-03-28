import { Metadata } from 'next'
import { siteConfig } from '@/config'
import SideContainer from '@components/SideContainer'
import CuentiForm from '@components/form/CuentiForm'
import { ContactUs, HaveAccountAlready } from '@components/Helpers'
import Separator from '@components/icons/Separator'
import CuentiSwiper from '@components/Swiper'
import CuentiLogo from '@icons/CuentiLogo'
import { slides } from '@/config/Constants'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  ...siteConfig.pages.register,
}

export default async function Register() {
  const session = await auth()

  if (session) {
    redirect(`/steps`)
  }

  return (
    <main className="gap-3 px-6 py-4 md:p-8 min-w-screen min-h-screen lg:h-screen flex flex-row overflow-hidden">
      <SideContainer
        startContent={<HaveAccountAlready />}
        endContent={<ContactUs />}
      >
        <CuentiLogo className="w-36 md:hidden mb-8" />
        <div className="flex flex-col gap-6 relative max-w-md pt-20 mb-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-rubik font-bold text-cuenti-dark-blue w-full text-center">
              Crear una cuenta
            </h1>
            <p className="text-center text-pretty">
              <span className="font-semibold">
                ¡Nuestro Software crece contigo!
              </span>
              , ingresa tus datos y comienza a hacer crecer tu negocio.
            </p>
          </div>
          <Separator />
          <CuentiForm />
        </div>
      </SideContainer>
      <SideContainer
        className="max-w-[50%] hidden md:flex items-center justify-center"
        hasRightCircles
      >
        <CuentiLogo className="w-40" />
        <CuentiSwiper slides={slides} />
      </SideContainer>
    </main>
  )
}
