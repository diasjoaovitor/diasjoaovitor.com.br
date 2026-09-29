import type { ReactNode } from 'react'

export const Main = ({ children }: { children: ReactNode }) => (
  <main className="flex flex-1 flex-col px-4">
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col py-4">
      {children}
    </div>
  </main>
)
