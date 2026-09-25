import { cn } from 'cn'
import { type ComponentPropsWithoutRef } from 'react'

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
}

export const Marquee = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) => (
  <div
    {...props}
    className={cn(
      'group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
      {
        'flex-row': !vertical,
        'flex-col': vertical
      },
      className
    )}
  >
    {Array.from({ length: repeat }, (_, index) => (
      <div
        key={index}
        className={cn('flex shrink-0 justify-around gap-(--gap)', {
          'animate-marquee flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          '[animation-direction:reverse]': reverse
        })}
      >
        {children}
      </div>
    ))}
  </div>
)
