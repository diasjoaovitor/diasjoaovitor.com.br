import Link from 'next/link'

import { FormattedDate } from '@/app/components/blocks/formatted-date'

export const PostHeader = ({ title, date }: { title: string; date: Date }) => (
  <header className="mb-10 flex flex-col gap-3">
    <Link
      href="/blog"
      className="w-fit py-1 font-mono text-xs tracking-[0.3em] text-muted-foreground outline-hidden transition-colors hover:text-primary focus-visible:ring-3 focus-visible:ring-ring"
    >
      <span aria-hidden className="text-primary">
        $
      </span>{' '}
      cd ../
      {/* WCAG 2.5.3 Label in Name: speech input users say the visible text, so it stays in the accessible name */}
      <span className="sr-only">, voltar para o blog</span>
    </Link>
    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
    <FormattedDate date={date} />
  </header>
)
