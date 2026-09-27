import { allPosts } from 'content-collections'

const BlogPage = () => {
  return <pre>{JSON.stringify(allPosts, null, 2)}</pre>
}

export default BlogPage
