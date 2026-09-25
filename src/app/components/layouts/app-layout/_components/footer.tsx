import { SiGithub } from '@icons-pack/react-simple-icons'
import { cn } from 'cn'
import { Mail } from 'lucide-react'

import { LinkedIn } from '@/app/components/ui/icons/linkedin'
import { buttonVariants } from '@/app/components/ui/shadcn/button'

import { CurrentYear } from './current-year'

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
  <footer className="border-t border-teal-500 text-xs text-muted-foreground dark:border-teal-950">
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-2 px-4 py-2 sm:flex-row sm:justify-between">
      <p>
        &copy; <CurrentYear /> diasjoaovitor.com.br
      </p>
      <nav aria-label="Contato">
        {/* WebKit drops list semantics when list-style is none (https://webkit.org/b/170179) */}
        <ul role="list" className="flex flex-wrap justify-center gap-2">
          {contactLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'text-xs text-foreground transition-colors hover:text-primary dark:text-muted-foreground'
                )}
              >
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
