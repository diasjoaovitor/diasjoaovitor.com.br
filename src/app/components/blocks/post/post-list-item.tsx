import type { Post } from 'content-collections'
import Link from 'next/link'

import { PostDate } from './post-date'

export type TPostHeadingLevel = 'h2' | 'h3'

export const PostListItem = ({
  post: { slug, title, summary, date },
  headingLevel: Heading = 'h2'
}: {
  post: Pick<Post, 'slug' | 'title' | 'summary' | 'date'>
  headingLevel?: TPostHeadingLevel
}) => (
  <article className="group relative flex flex-col gap-2 py-6 transition-colors hover:bg-muted/50 sm:px-4">
    <Heading className="text-xl font-semibold tracking-tight">
      <Link
        href={`/blog/${slug}`}
        className="outline-hidden transition-colors group-hover:text-primary after:absolute after:inset-0 focus-visible:after:inset-ring-3 focus-visible:after:inset-ring-ring"
      >
        {title}
      </Link>
    </Heading>
    <p className="text-muted-foreground">{summary}</p>
    <PostDate date={date} className="font-mono text-sm" />
  </article>
)
