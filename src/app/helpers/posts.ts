import { allPosts } from 'content-collections'

// Drafts are served by `next dev` so they can be previewed
export const getVisiblePosts = () =>
  allPosts
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
