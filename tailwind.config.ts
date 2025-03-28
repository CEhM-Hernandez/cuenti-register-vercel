import { heroui } from '@heroui/react'

const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cuenti: {
          blue: '#1A4081',
          'dark-blue': '#192644',
          'light-blue': '#2664CF',
          green: '#4EAF41',
          yellow: '#FDC50E',
          'dark-yellow': '#F59E1B',
          gray: '#8D8D8D',
        },
        danger: {
          DEFAULT: '#E62D2D',
        },
        primary: {
          DEFAULT: '#1A4081',
        },
      },
      fontFamily: {
        rubik: [`var(--font-rubik)`, 'sistem-ui'],
        quicksand: [`var(--font-quicksand)`, 'sistem-ui'],
      },
      backgroundImage: {
        step: 'url("https://cuenti.com/cdn/form-register/steps-background.webp")',
      },
    },
  },
  plugins: [heroui()],
}

export default config
