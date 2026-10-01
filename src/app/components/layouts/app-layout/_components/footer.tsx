import { SiGithub } from '@icons-pack/react-simple-icons'
import { Mail } from 'lucide-react'

import { LinkedIn } from '@/app/components/ui/icons/linkedin'

import { CurrentYear } from './current-year'
import { footerLinkClassName } from './footer-link'
import { LegalNav } from './legal-nav'

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/diasjoaovitor',
    Icon: SiGithub
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/diasjoaovitor',
    Icon: LinkedIn
  },
  {
    label: 'E-mail',
    href: 'mailto:dias_joaovitor+contato@hotmail.com',
    Icon: Mail
  }
]

export const Footer = () => (
  <footer className="border-t border-teal-500 px-4 text-xs text-muted-foreground dark:border-teal-950">
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 py-2 sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center gap-x-4 gap-y-2 sm:flex-row">
        <p>
          &copy; <CurrentYear /> diasjoaovitor.com.br
        </p>
        <LegalNav />
      </div>
      <nav aria-label="Contato">
        {/* WebKit drops list semantics when list-style is none (https://webkit.org/b/170179) */}
        <ul role="list" className="flex flex-wrap justify-center gap-2">
          {contactLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a href={href} className={footerLinkClassName}>
                {/* SiGithub always renders a title, which shows a tooltip duplicating the visible label */}
                <Icon title="" aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </footer>
)
