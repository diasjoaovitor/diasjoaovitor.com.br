import { cn } from 'cn'

import { buttonVariants } from '@/app/components/ui/shadcn/button'

export const footerLinkClassName = cn(
  buttonVariants({ variant: 'link' }),
  'text-xs text-foreground transition-colors hover:text-primary dark:text-muted-foreground'
)
