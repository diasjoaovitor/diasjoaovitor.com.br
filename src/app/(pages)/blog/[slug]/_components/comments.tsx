'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

import { TerminalCommand } from '@/app/components/ui/custom/terminal-command'
import { useIsHydrated } from '@/app/hooks/use-is-hydrated'

export const Comments = () => {
  const isHydrated = useIsHydrated()
  const { resolvedTheme } = useTheme()

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-16 flex flex-col gap-3 border-t pt-10"
    >
      <TerminalCommand
        as="h2"
        id="comments-heading"
        label="comentários"
        command="tail -f comments"
      />
      <div className="min-h-64">
        {isHydrated && (
          <Giscus
            repo="diasjoaovitor/diasjoaovitor.com.br"
            repoId="R_kgDOO1dXfg"
            category="Announcements"
            categoryId="DIC_kwDOO1dXfs4DGDGY"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            lang="pt"
            loading="lazy"
          />
        )}
      </div>
    </section>
  )
}
