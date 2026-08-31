'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/app/components'
import { useMounted } from '@/app/hooks'

export const ThemeToggle = () => {
  const mounted = useMounted()
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Ativar tema claro' : 'Ativar tema escuro'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  )
}
