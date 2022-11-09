import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

type Props = {
  href: string
  color?: 'primary' | 'secondary'
}
const ButtonLink: FC<PropsWithChildren<Props>> = (props) => {
  const { href, children, color = 'primary' } = props

  let className =
    'block px-3 py-2 mt-2 text-white border rounded-lg bg-primary disabled:bg-gray-200 hover:no-underline'
  if (color == 'secondary') {
    className =
      'block px-3 py-2 mt-2 text-white border rounded-lg bg-secondary disabled:bg-gray-200 hover:no-underline'
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

export default ButtonLink
