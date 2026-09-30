import { buildFeed } from '@/app/helpers/feed'
import { getVisiblePosts } from '@/app/helpers/posts'

export const dynamic = 'force-static'

export const GET = () =>
  new Response(buildFeed(getVisiblePosts()), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  })
