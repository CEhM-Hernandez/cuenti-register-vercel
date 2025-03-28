import { Rubik } from 'next/font/google'
import { Quicksand } from 'next/font/google'

export const rubik = Rubik({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-rubik',
  weight: ['600', '700'],
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  style: 'normal',
  variable: '--font-quicksand',
  weight: ['400', '700'],
})
