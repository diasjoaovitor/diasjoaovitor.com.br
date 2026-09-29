import type { Post } from 'content-collections'

import { PostListItem } from './post-list-item'

export const PostList = ({ posts }: { posts: Post[] }) => (
  // WebKit drops list semantics when list-style is none (https://webkit.org/b/170179)
  <ul
    role="list"
    className="flex flex-col divide-y divide-teal-500 sm:-mx-4 dark:divide-teal-950"
  >
    {posts.map((post) => (
      <li key={post.slug}>
        <PostListItem post={post} />
      </li>
    ))}
  </ul>
)
