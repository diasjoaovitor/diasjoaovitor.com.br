import Link from 'next/link'

import { ThemeToggle } from './theme-toggle'

export const Header = () => (
  <header className="border-b border-teal-950 dark:border-border">
    <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2">
      <Link
        href="/"
        className="outline-hidden focus-visible:ring-3 focus-visible:ring-ring"
      >
        João Vitor
      </Link>
      <ThemeToggle />
    </div>
  </header>
)
