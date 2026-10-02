import { FlickeringGrid } from '@/app/components/ui/magicui/flickering-grid'

// Tailwind's teal-500: the grid paints on a canvas, which can't resolve CSS variables
const color = 'oklch(70.4% 0.14 182.503)'

export const Background = () => (
  <FlickeringGrid
    color={color}
    className="absolute inset-x-0 top-0 -z-10 h-svh mask-b-from-40% motion-reduce:hidden"
  />
)
