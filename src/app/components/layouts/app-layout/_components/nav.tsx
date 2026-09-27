'use client'

import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type TNavLink = {
  href: string
  label: string
}

const navLinks: TNavLink[] = [
  { href: '/', label: 'olá' },
  { href: '/blog', label: 'blog' }
]

const isNavLinkActive = (pathname: string, href: string) =>
  href === '/'
    ? pathname === href
    : pathname.startsWith(`${href}/`) || pathname === href

export const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex items-center gap-4 font-mono">
      {navLinks.map(({ href, label }) => {
        const isActive = isNavLinkActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'py-1 outline-hidden transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring',
              isActive ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
