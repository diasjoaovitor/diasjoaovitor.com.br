'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { Button } from '@/app/components/ui/shadcn/button'

const noop = () => {}
const subscribe = () => noop

// next-themes only knows the resolved theme on the client, so the label waits
// for hydration to avoid a server/client mismatch
// (https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch)
const useIsHydrated = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isHydrated = useIsHydrated()
  const isDark = resolvedTheme === 'dark'

  const actionLabel = isDark ? 'Ativar tema claro' : 'Ativar tema escuro'
  const label = isHydrated ? actionLabel : 'Alternar tema'

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Sun aria-hidden className="hidden dark:block" />
      <Moon aria-hidden className="dark:hidden" />
    </Button>
  )
}
