'use client'

import { useEffect, useRef } from 'react'

import JSConfetti from 'js-confetti'

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button,
  ModalContent,
} from '@heroui/react'

import ChevronRight from '@icons/ChevronRight'

export default function IntroModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const confettiRef = useRef<JSConfetti | null>(null)

  useEffect(() => {
    onOpen()
    confettiRef.current = new JSConfetti()
  }, [onOpen])

  return (
    <Modal
      isOpen={isOpen}
      defaultOpen
      size="4xl"
      radius="md"
      placement="center"
      onOpenChange={onOpenChange}
      onClose={() => confettiRef.current?.addConfetti()}
      classNames={{
        wrapper: ['backdrop-blur-[2px]'],
        base: ['p-0 lg:px-4'],
        body: ['p-2 lg:px-4'],
        header: ['p-2 lg:p-4'],
        footer: ['p-2 lg:p-4'],
        closeButton: [
          'rounded-lg',
          'hover:bg-danger hover:text-white',
          'transition-colors duration-400',
        ],
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 ">
              <h1 className="font-rubik text-xl md:text-2xl">
                ¡Bienvenido a Cuenti!
              </h1>
            </ModalHeader>
            <ModalBody>
              <iframe
                src="https://www.youtube.com/embed/CD3fe4sXM70?si=xKxLKJaU2RAk4C8Q"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-2xl w-full aspect-video m-0 p-0"
              ></iframe>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="solid"
                onPress={onClose}
                endContent={<ChevronRight className="size-4 text-white" />}
              >
                Saltar Introducción
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
