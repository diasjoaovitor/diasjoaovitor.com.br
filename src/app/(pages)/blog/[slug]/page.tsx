import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getVisiblePosts } from '@/app/helpers/posts'

import { Comments } from './_components/comments'
import { PostContent } from './_components/post-content'
import { PostHeader } from './_components/post-header'

const getPost = (slug: string) => {
  const post = getVisiblePosts().find((post) => post.slug === slug)
  if (!post) notFound()
  return post
}

export const dynamicParams = false

export const generateStaticParams = () =>
  getVisiblePosts().map(({ slug }) => ({ slug }))

export const generateMetadata = async ({
  params
}: PageProps<'/blog/[slug]'>): Promise<Metadata> => {
  const { slug } = await params
  const { title, summary, date, author } = getPost(slug)
  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      url: `/blog/${slug}`,
      siteName: 'diasjoaovitor.com.br',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: date.toISOString(),
      authors: [author]
    }
  }
}

const PostPage = async ({ params }: PageProps<'/blog/[slug]'>) => {
  const { slug } = await params
  const post = getPost(slug)

  return (
    <article className="py-12">
      <PostHeader title={post.title} date={post.date} />
      <PostContent html={post.html} />
      <Comments />
    </article>
  )
}

export default PostPage
