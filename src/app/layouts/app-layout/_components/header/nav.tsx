'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/app/lib'

import { ThemeToggle } from './theme-toggle'

type TNavigation = {
  href: string
  label: string
}

const navigation: TNavigation[] = [
  { href: '/', label: 'olá' },
  { href: '/blog', label: 'blog' }
] as const

export const Nav = () => {
  const pathname = usePathname()
  return (
    <nav className="flex items-center gap-4 font-mono">
      {navigation.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'text-lg transition-colors hover:text-teal-500',
              isActive ? 'text-teal-500' : 'text-muted-foreground'
            )}
          >
            {label}
          </Link>
        )
      })}
      <ThemeToggle />
    </nav>
  )
}
