'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ReactNode } from 'react'

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    // `color-scheme` is set per theme in globals.css (#4), so no inline style on <html>
    enableColorScheme={false}
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
)
