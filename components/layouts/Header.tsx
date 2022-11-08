import Link from 'next/link'
import { FC } from 'react'
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '../../lib/config'

type Props = {}

const Header: FC<Props> = () => {
  return (
    <header className="flex flex-col items-center justify-center pt-8 pb-4">
      <h1>
        <Link
          href="/"
          className="text-5xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {APP_NAME}
        </Link>
      </h1>

      <h2 className="my-8 text-2xl font-light leading-8 text-gray-500 sm:text-3xl">
        {APP_DESCRIPTION}
      </h2>

      <p className="text-lg text-pink-400">{APP_SLOGAN}</p>
    </header>
  )
}

export default Header
