import Link from 'next/link'

import { ThemeToggle } from './theme-toggle'

export const Header = () => (
  <header className="border-b border-teal-500 py-1 dark:border-teal-950">
    <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
      <Link
        href="/"
        className="font-mono tracking-tight outline-hidden focus-visible:ring-3 focus-visible:ring-ring dark:text-muted-foreground"
      >
        {/* Screen readers would announce the brackets as "less than" and "slash greater than" */}
        <span aria-hidden className="text-primary dark:text-teal-700">
          &lt;
        </span>
        João Vitor
        <span aria-hidden className="text-primary dark:text-teal-700">
          /&gt;
        </span>
      </Link>
      <ThemeToggle />
    </div>
  </header>
)
