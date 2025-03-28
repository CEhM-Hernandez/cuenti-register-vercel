import type { Metadata } from 'next'

import { siteConfig } from '@/config'

import { rubik, quicksand } from '@/app/ui/fonts/fonts'

import '@/globals.css'

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: {
    icon: './favicon.ico',
    apple: './favicon.ico',
    shortcut: './favicon.ico',
    other: {
      rel: 'favicon',
      url: './favicon.ico',
    },
  },
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
  },
  category: siteConfig.category,
  generator: siteConfig.author.name,
  referrer: 'same-origin',
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  authors: [siteConfig.author],
  appLinks: {
    web: {
      url: 'https://www.cuenti.com',
      should_fallback: true,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${rubik.variable} ${quicksand.variable} font-quicksand`}
      >
        {children}
      </body>
    </html>
  )
}
