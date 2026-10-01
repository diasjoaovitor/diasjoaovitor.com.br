import { cn } from 'cn'

const dateFormat = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeZone: 'UTC'
})

export const FormattedDate = ({
  date,
  className
}: {
  date: Date
  className?: string
}) => (
  <time
    dateTime={date.toISOString().slice(0, 10)}
    className={cn('text-muted-foreground', className)}
  >
    {dateFormat.format(date)}
  </time>
)
