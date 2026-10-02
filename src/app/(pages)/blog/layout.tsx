const BlogLayout = ({ children }: LayoutProps<'/blog'>) => (
  <>
    {children}
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 -z-10 h-96 bg-radial-[ellipse_at_top] from-teal-500/5 to-transparent to-70% dark:from-teal-500/10"
    />
  </>
)

export default BlogLayout
