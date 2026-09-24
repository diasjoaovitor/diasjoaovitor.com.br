import type { ReactNode } from 'react'

export const Main = ({ children }: { children: ReactNode }) => (
  <main className="flex flex-1 flex-col">
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col p-4">
      {children}
    </div>
  </main>
)
