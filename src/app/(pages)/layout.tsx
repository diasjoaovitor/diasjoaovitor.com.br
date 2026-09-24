import '../styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AppLayout } from '@/app/components/layouts/app-layout'
import { ThemeProvider } from '@/app/components/providers/theme-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'João Vitor — Desenvolvedor Fullstack',
  description:
    'Anotações técnicas sobre desenvolvimento fullstack, escritas por João Vitor.'
}

const RootLayout = ({ children }: LayoutProps<'/'>) => (
  <html
    lang="pt-BR"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    suppressHydrationWarning
  >
    <body className="flex min-h-full flex-col">
      <ThemeProvider>
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
