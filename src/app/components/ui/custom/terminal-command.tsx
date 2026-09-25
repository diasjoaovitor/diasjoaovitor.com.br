import { cn } from 'cn'
import type { HTMLAttributes } from 'react'

type TTerminalCommandProps = HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'h2' | 'h3'
  command: string
}

export const TerminalCommand = ({
  as: Component = 'p',
  command,
  className,
  ...props
}: TTerminalCommandProps) => (
  <Component
    // Without an aria-label the prompt is decorative. Chromium drops a heading whose whole content is aria-hidden, even when it has an aria-label
    aria-hidden={props['aria-label'] ? undefined : true}
    className={cn(
      'font-mono text-xs tracking-[0.3em] text-muted-foreground',
      className
    )}
    {...props}
  >
    <span className="text-primary">$</span> {command}
  </Component>
)
