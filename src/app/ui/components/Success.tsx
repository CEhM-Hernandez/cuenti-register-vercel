'use client'

import Link from 'next/link'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@heroui/react'

import IntroModal from '@components/IntroModal'
import IconoCuenti from '@components/icons/IconoCuenti'

export default function Success() {
  return (
    <>
      <IntroModal />
      <Card
        className="p-4 !pt-16 z-10 gap-4 bg-cuenti-dark-blue text-white md:py-4 items-center justify-center md:px-20 h-full w-full md:min-w-[500px] md:max-w-2xl md:h-[90%] md:rounded-2xl overflow-hidden md:overflow-visible"
        radius="none"
      >
        <CardHeader className="flex-col gap-4 p-0 m-0">
          <IconoCuenti className="size-24 mx-auto" />
          <h1 className="text-4xl font-bold text-center text-balance p-0 m-0">
            ¡Listo, tus 7 días de prueba inician YA!
          </h1>
        </CardHeader>
        <CardBody className="gap-6 items-center justify-center p-0 m-0 overflow-visible">
          <p className="text-center text-2xl w-full">
            Gracias por registrarte. Ahora puedes disfrutar de todos los
            beneficios que tenemos en Cuenti para ti.
          </p>
          <Button
            as={Link}
            href="https://www.cuenti.com"
            type="button"
            variant="solid"
            radius="none"
            className="min-h-14 w-fit text-xl px-6 rounded-[18px] bg-cuenti-yellow text-cuenti-dark-blue hover:!bg-gradient-to-l from-cuenti-dark-yellow from-20% to-cuenti-yellow to-80% font-bold hover:!opacity-100 data-[focus=true]:outline-cuenti-yellow"
          >
            Empezar mi prueba
          </Button>
        </CardBody>
        <span className="bg-cuenti-yellow md:bg-cuenti-blue size-72 rounded-full absolute -left-[30%] -top-[20%] md:left-10 md:top-[15%] blur-3xl -z-10" />
        <CardFooter className="flex items-end md:items-start justify-center overflow-visible h-full md:h-3/4 relative p-0 m-0">
          <Image
            alt="Ilustración de éxito"
            width={400}
            src="https://cuenti.com/cdn/form-register/success-ilustration.webp"
            classNames={{
              wrapper:
                'size-[90%] absolute -bottom-10 md:-bottom-16 z-10 aspect-w-16 aspect-h-9 flex items-end justify-center',
            }}
          />
          <span className="bg-cuenti-blue size-96 rounded-full absolute -right-10 -top-16 md:top-0 blur-3xl -z-10" />
        </CardFooter>
      </Card>
    </>
  )
}
