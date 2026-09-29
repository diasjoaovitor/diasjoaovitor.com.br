import { PostDate } from '@/app/components/blocks/post/post-date'

export const PostHeader = ({ title, date }: { title: string; date: Date }) => (
  <header className="mb-10 flex flex-col gap-3">
    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
    <PostDate date={date} />
  </header>
)
