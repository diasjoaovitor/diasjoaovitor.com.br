import { ReactNode } from 'react'

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="isolate flex flex-1 p-4">
      <div className="container mx-auto flex max-w-2xl flex-1 flex-col">
        {children}
      </div>
    </main>
  )
}
