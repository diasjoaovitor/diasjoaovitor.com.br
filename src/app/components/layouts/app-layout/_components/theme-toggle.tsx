'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/app/components/ui/shadcn/button'

import { useIsHydrated } from './use-is-hydrated'

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  // next-themes only knows the resolved theme on the client, so the label waits
  // for hydration to avoid a server/client mismatch
  // (https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch)
  const isHydrated = useIsHydrated()

  const isDark = resolvedTheme === 'dark'

  const actionLabel = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
  const label = isHydrated ? actionLabel : 'Alternar tema'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun aria-hidden className="hidden dark:block" />
      <Moon aria-hidden className="dark:hidden" />
    </Button>
  )
}
