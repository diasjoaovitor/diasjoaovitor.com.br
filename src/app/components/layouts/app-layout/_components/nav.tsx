'use client'

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
    <nav aria-label="Principal" className="flex items-center gap-4 font-mono">
      {navLinks.map(({ href, label }) => {
        const isActive = isNavLinkActive(pathname, href)
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            className="py-1 text-muted-foreground underline-offset-4 outline-hidden transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring aria-[current=page]:text-primary aria-[current=page]:underline"
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
