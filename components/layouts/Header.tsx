import Link from 'next/link'
import { FC } from 'react'
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from '../../lib/config'

type Props = {}

const Header: FC<Props> = () => {
  return (
    <header className="flex flex-col items-center justify-center pb-8">
      <h1>
        <Link
          href="/"
          className="text-4xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {APP_NAME}
        </Link>
      </h1>

      <h2 className="mt-4 mb-4 text-xl font-light leading-8 text-center text-gray-500 md:mt-6 sm:text-2xl">
        {APP_DESCRIPTION}
      </h2>

      {/* <p className="text-lg text-pink-400">{APP_SLOGAN}</p> */}
    </header>
  )
}

export default Header
