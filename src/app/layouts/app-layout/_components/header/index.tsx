import Link from 'next/link'

import { Avatar } from './avatar'
import { Nav } from './nav'

export const Header = () => {
  return (
    <header className="sticky top-0 border-b border-teal-950 p-2 backdrop-blur-xs">
      <div className="container mx-auto flex max-w-4xl justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Avatar />
          <span className="text-lg">João Vitor</span>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
