import { FormattedDate } from '@/app/components/blocks/formatted-date'
import { MarkdownContent } from '@/app/components/blocks/markdown-content'
import { getLegalPage } from '@/app/helpers/legal-pages'

export const LegalPage = ({ slug }: { slug: string }) => {
  const { title, updatedAt, html } = getLegalPage(slug)

  return (
    <article className="py-12">
      <header className="mb-10 flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">
          Última atualização:{' '}
          <FormattedDate date={updatedAt} className="text-inherit" />
        </p>
      </header>
      <MarkdownContent html={html} />
    </article>
  )
}
