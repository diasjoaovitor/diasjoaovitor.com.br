import { cn } from 'cn'
import type { HTMLAttributes } from 'react'

type TTerminalCommandProps = HTMLAttributes<HTMLElement> & {
  as?: 'p' | 'h2' | 'h3'
  command: string
  label?: string
}

export const TerminalCommand = ({
  as: Component = 'p',
  command,
  label,
  className,
  ...props
}: TTerminalCommandProps) => (
  <Component
    // Without a label the prompt is decorative
    aria-hidden={label ? undefined : true}
    className={cn(
      'font-mono text-xs tracking-[0.3em] text-muted-foreground',
      className
    )}
    {...props}
  >
    {/* Some screen readers read a heading's text instead of its aria-label in browse mode, so the label is real text */}
    {label && <span className="sr-only">{label}</span>}
    <span aria-hidden={label ? true : undefined}>
      <span className="text-primary">$</span> {command}
    </span>
  </Component>
)
