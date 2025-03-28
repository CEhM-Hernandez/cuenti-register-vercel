'use client'

import { Card, CardBody, CardFooter, CardHeader, Form } from '@heroui/react'

import { handleSubmit } from '@utils/handleMultiFormSubmit'

import { useMultiStepForm } from '@hooks/useMultiStepForm'

import { Stepper } from '@components/form/multi_form/Stepper'
import { StepHeader } from '@components/form/multi_form/StepHeader'
import { StepNavigation } from '@components/form/multi_form/StepNavigation'
import { FormAlert } from '@components/form/multi_form/FormAlert'

import StepOne from '@components/form/multi_form/steps/StepOne'
import StepTwo from '@components/form/multi_form/steps/StepTwo'
import StepThree from '@components/form/multi_form/steps/StepThree'

export default function MultiStepWrapper() {
  const { step, TotalSteps, errors, setErrors, nextStep, prevStep, loading } =
    useMultiStepForm()

  return (
    <>
      <FormAlert errors={errors} />
      <Card
        className="p-4 md:py-4 items-center md:px-20 h-full w-full md:min-w-[500px] md:max-w-2xl md:h-[90%] md:rounded-2xl overflow-hidden gap-4 shadow-xl"
        radius="none"
      >
        <CardHeader className="flex-col gap-2 p-0 m-0 w-full">
          <Stepper step={step} TotalSteps={TotalSteps} />
          <StepHeader step={step} TotalSteps={TotalSteps} />
        </CardHeader>
        <CardBody className="scrollbar-custom max-w-md px-0 static">
          <Form
            id="steps"
            className="items-center h-min"
            validationBehavior="aria"
            validationErrors={errors}
            onSubmit={(e) => handleSubmit(e, step, nextStep, setErrors)}
          >
            {step === 1 && <StepOne />}
            {step === 2 && <StepTwo errors={errors} />}
            {step === 3 && <StepThree />}
          </Form>
        </CardBody>
        <CardFooter className="w-full min-h-14">
          <StepNavigation
            loading={loading}
            step={step}
            prevStep={prevStep}
            TotalSteps={TotalSteps}
          />
        </CardFooter>
      </Card>
    </>
  )
}
