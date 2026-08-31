import { IconType, SiGithub } from '@icons-pack/react-simple-icons'
import { Mail } from 'lucide-react'
import Link from 'next/link'

type TSocialLink = {
  href: string
  label: string
  Icon: IconType
}

const socialLinks: TSocialLink[] = [
  {
    href: 'https://github.com/diasjoaovitor',
    label: 'GitHub',
    Icon: SiGithub
  },
  {
    href: 'mailto:contato@diasjoaovitor.com.br',
    label: 'E-mail',
    Icon: Mail
  }
]

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-teal-950 p-2 backdrop-blur-xs">
      <div className="container mx-auto flex max-w-4xl flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-xs">
          <p>&copy; {currentYear} diasjoaovitor.com.br</p>·
          <Link
            className="transition-colors hover:text-teal-600"
            href="/termos-de-uso"
          >
            Termos de Uso
          </Link>
          ·
          <Link
            className="transition-colors hover:text-teal-600"
            href="/politica-de-privacidade"
          >
            Política de Privacidade
          </Link>
        </div>
        <ul className="flex gap-4">
          {socialLinks.map(({ href, label, Icon }) => {
            return (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="transition-colors hover:text-teal-600"
                >
                  <Icon size={18} aria-hidden />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </footer>
  )
}
