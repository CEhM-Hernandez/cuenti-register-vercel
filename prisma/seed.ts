import { prisma } from '@lib/prisma'
import { StepName } from '@prisma/client'

async function main() {
  const steps = [
    {
      id: 0,
      name: StepName.EMAIL_PASSWORD,
      description: 'Correo y Contraseña',
    },
    {
      id: 1,
      name: StepName.BUSINESS_TYPE,
      description: 'selecciona tu tipo de negocio',
    },
    { id: 2, name: StepName.FULL_NAME, description: 'Nombre y Apellido' },
    { id: 3, name: StepName.PHONE, description: 'Número de Teléfono' },
  ]

  for (const step of steps) {
    await prisma.step.upsert({
      where: { id: step.id },
      update: {},
      create: step,
    })
  }

  console.log('Steps insertados correctamente')
}

main()
  .catch((e) => {
    console.error('❌ Error en la seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
