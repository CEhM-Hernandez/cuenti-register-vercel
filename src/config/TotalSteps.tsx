import type { TotalSteps as TotalStepsType } from '@/types'

export const TotalSteps: TotalStepsType = [
  {
    id: 1,
    imgUrl:
      'https://cuenti.com/cdn/form-register/step_headers/step-1-header.gif',
    title: (
      <>
        Selecciona la<strong className="text-cuenti-blue"> actividad </strong>
        que mejor describe a tu negocio
      </>
    ),
    description:
      'Estamos para acompañarte en el proceso de creación de tu cuenta. 😉',
  },
  {
    id: 2,
    imgUrl:
      'https://cuenti.com/cdn/form-register/step_headers/step-2-header.gif',
    title: (
      <>
        ¡Ayúdanos a<strong className="text-cuenti-blue"> personalizar </strong>
        tu cuenta!
      </>
    ),
    description:
      '¡Bien hecho!, ahora ayúdanos a completar tus datos e información para adaptarnos a tus preferencias. 🥳',
  },
  {
    id: 3,
    imgUrl:
      'https://cuenti.com/cdn/form-register/step_headers/step-3-header.gif',
    title: (
      <>
        ¡Perfecto!, estás
        <strong className="text-cuenti-blue"> a un solo paso </strong>de
        comenzar...
      </>
    ),
    description: 'Déjanos tu Whatsapp para enviarte tus datos de inicio. 👍🏻',
  },
]
