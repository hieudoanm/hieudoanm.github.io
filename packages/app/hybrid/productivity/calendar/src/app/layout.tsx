import { mono, sans, serif } from '@/lib/fonts'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { FC, ReactNode } from 'react'
import { Header } from '@/components/organisms/Header'

export const metadata: Metadata = {
  title: 'Calendar - Productivity',
  description: 'A calendar productivity app with multiple calendar views',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Calendar',
  },
}

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <html
    lang="en"
    data-theme="calendar-dark"
    className={`${sans.variable} ${mono.variable} ${serif.variable}`}
  >
    <head>
      <link rel="apple-touch-icon" href="/icons/icon-192.png" />
    </head>
    <body
      className="bg-base-100 text-base-content h-screen overflow-y-auto"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <Header />
      {children}
    </body>
  </html>
)

export default RootLayout
