import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { PostList } from '@/app/components/blocks/post/post-list'
import { TerminalCommand } from '@/app/components/ui/custom/terminal-command'
import { getVisiblePosts } from '@/app/helpers/posts'

const recentPostsCount = 3

export const RecentPosts = () => {
  const posts = getVisiblePosts().slice(0, recentPostsCount)

  if (posts.length === 0) {
    return null
  }

  return (
    <section
      aria-labelledby="recent-posts-heading"
      className="flex flex-col gap-3"
    >
      <TerminalCommand
        as="h2"
        id="recent-posts-heading"
        label="posts recentes"
        command="ls -t ~/blog | head -3"
      />
      <PostList posts={posts} headingLevel="h3" />
      <Link
        href="/blog"
        className="flex w-fit items-center gap-2 py-1 font-mono text-sm text-primary underline-offset-4 outline-hidden hover:underline focus-visible:ring-3 focus-visible:ring-ring"
      >
        Ver todos os posts
        <ArrowRight aria-hidden className="size-4" />
      </Link>
    </section>
  )
}
