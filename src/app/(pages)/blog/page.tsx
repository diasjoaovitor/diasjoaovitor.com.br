import type { Metadata } from 'next'

import { PostList } from '@/app/components/blocks/post/post-list'
import { TerminalCommand } from '@/app/components/ui/custom/terminal-command'
import { getVisiblePosts } from '@/app/helpers/posts'
import { openGraphDefaults } from '@/app/helpers/site'

const title = 'Blog'
const description =
  'Posts sobre desenvolvimento fullstack, do mais recente ao mais antigo.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...openGraphDefaults,
    title,
    description,
    url: '/blog',
    type: 'website'
  }
}

const BlogPage = () => {
  const posts = getVisiblePosts()

  return (
    <div className="flex flex-col gap-8 py-12">
      <header className="flex flex-col gap-3">
        <TerminalCommand command="ls ~/blog" />
        <h1 className="flex text-4xl leading-tight font-semibold">
          <span aria-hidden className="mr-3 text-primary">
            &gt;
          </span>
          Blog
        </h1>
      </header>
      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p className="text-muted-foreground">Nenhum post publicado ainda.</p>
      )}
    </div>
  )
}

export default BlogPage
