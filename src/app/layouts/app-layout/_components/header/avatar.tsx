import { Code2 } from 'lucide-react'

import {
  Avatar as CnAvatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage
} from '@/app/components'

type TAvatarProps = {
  size?: 'sm' | 'default' | 'lg'
}

export const Avatar = ({ size }: TAvatarProps) => {
  return (
    <CnAvatar size={size}>
      <AvatarImage src="/avatar.jpg" alt="João Vitor" />
      <AvatarFallback>JV</AvatarFallback>
      <AvatarBadge className="bg-teal-500">
        <Code2 />
      </AvatarBadge>
    </CnAvatar>
  )
}
