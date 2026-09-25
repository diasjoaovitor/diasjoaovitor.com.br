'use client'

import { useTheme } from 'next-themes'

import { FlickeringGrid } from '@/app/components/ui/magicui/flickering-grid'
import { useIsHydrated } from '@/app/hooks/use-is-hydrated'

// Tailwind's teal-950/teal-200: the grid paints on a canvas, which can't resolve CSS variables
const colors = {
  dark: 'oklch(27.7% 0.046 192.524)',
  light: 'oklch(91% 0.096 180.426)'
}

export const Background = () => {
  const isHydrated = useIsHydrated()
  const { resolvedTheme } = useTheme()

  // The theme is only known on the client, so the grid waits for hydration instead of flashing the wrong color
  if (!isHydrated) return null

  return (
    <FlickeringGrid
      color={resolvedTheme === 'dark' ? colors.dark : colors.light}
      className="absolute inset-x-0 top-0 -z-10 h-svh mask-b-from-40% motion-reduce:hidden"
    />
  )
}
