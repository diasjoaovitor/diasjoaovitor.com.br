const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeZone: 'UTC'
})

export const PostHeader = ({ title, date }: { title: string; date: Date }) => (
  <header className="mb-10 flex flex-col gap-3">
    <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
    <time
      dateTime={date.toISOString().slice(0, 10)}
      className="text-muted-foreground"
    >
      {dateFormat.format(date)}
    </time>
  </header>
)
