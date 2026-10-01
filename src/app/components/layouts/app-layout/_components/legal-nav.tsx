'use client'

import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { footerLinkClassName } from './footer-link'

const legalLinks = [
  { label: 'Termos de uso', href: '/termos-de-uso' },
  { label: 'Política de Privacidade', href: '/politica-de-privacidade' }
]

export const LegalNav = () => {
  const pathname = usePathname()

  return (
    <nav aria-label="Legal">
      {/* WebKit drops list semantics when list-style is none (https://webkit.org/b/170179) */}
      <ul role="list" className="flex flex-wrap justify-center gap-2">
        {legalLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              className={cn(
                footerLinkClassName,
                'aria-[current=page]:text-primary aria-[current=page]:underline'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
