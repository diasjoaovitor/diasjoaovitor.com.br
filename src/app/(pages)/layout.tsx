import '../styles/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { AppLayout } from '@/app/components/layouts/app-layout'
import { ThemeProvider } from '@/app/components/providers/theme-provider'
import {
  ogImage,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl
} from '@/app/helpers/site'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s — João Vitor'
  },
  description: siteDescription,
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: siteName }]
    }
  },
  twitter: { card: 'summary_large_image', images: [ogImage] }
}

const RootLayout = ({ children }: LayoutProps<'/'>) => (
  <html
    lang="pt-BR"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    suppressHydrationWarning
  >
    <body className="relative flex min-h-full flex-col">
      <ThemeProvider>
        <AppLayout>{children}</AppLayout>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
