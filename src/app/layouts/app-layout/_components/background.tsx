'use client'

import { useTheme } from 'next-themes'

import { FlickeringGrid } from '@/app/components'
import { useMounted } from '@/app/hooks'

export const Background = () => {
  const mounted = useMounted()
  const { resolvedTheme } = useTheme()

  const isDark = !mounted || resolvedTheme === 'dark'
  const color = isDark ? '#0b4f4a' : '#96f7e4'

  return (
    <FlickeringGrid
      className="absolute inset-0 -z-10"
      color={color}
      style={{
        maskImage: 'linear-gradient(to bottom, black, black 40%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black, black 40%, transparent)'
      }}
    />
  )
}
