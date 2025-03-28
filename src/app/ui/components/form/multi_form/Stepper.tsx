'use client'

import { Fragment } from 'react'

import { motion } from 'framer-motion'

import { cn } from '@heroui/react'

import CheckIcon from '@icons/CheckIcon'

import type { StepperProps } from '@/types'

export function Stepper({ step, TotalSteps }: StepperProps) {
  return (
    <div className="flex w-full items-center gap-4 my-4">
      {TotalSteps.map((s, index) => (
        <Fragment key={s.id}>
          <div className="flex items-center justify-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'size-9 text-white text-center text-2xl flex items-center justify-center rounded-full border-none font-bold ring-offset-4 md:size-10 md:text-3xl transition-all duration-500 ease-soft-spring',
                step === s.id
                  ? 'ring-4 bg-cuenti-green ring-cuenti-green delay-200'
                  : 'bg-cuenti-dark-blue size-11 md:size-12',
                step > s.id ? 'bg-cuenti-green size-11 md:size-12' : '',
              )}
            >
              {step > s.id ? (
                <motion.div
                  initial={{ rotate: 0, x: 0 }}
                  animate={{
                    rotate: [0, -20, 10, -20, 10, 0],
                    x: [0, -3, 3, -3, 3, 0],
                  }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                  <CheckIcon className="size-7 md:size-9" />
                </motion.div>
              ) : (
                <span>{s.id}</span>
              )}
            </motion.div>
          </div>
          {s.id < TotalSteps.length && (
            <span className="h-1 rounded-full w-full bg-cuenti-dark-blue z-0">
              <span
                className={cn(
                  'h-1 block rounded-full bg-cuenti-green transition-size duration-500 z-10',
                  step > s.id ? 'w-full' : 'w-0',
                )}
              ></span>
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}
