import Link from 'next/link'
import { FC } from 'react'
import { CONTACT_FOUNDER_LINK } from '../../lib/config'

const DiscontinuedTopBar: FC = () => {
  return (
    <div className="flex-col items-center justify-center w-full gap-1 p-3 text-sm font-bold text-white bg-blue-400 md:flex md:flex-row">
      The project has been discontinued. Have an idea or like the domain name?
      <Link
        href={CONTACT_FOUNDER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline"
      >
        Contact the founder
      </Link>
    </div>
  )
}

export default DiscontinuedTopBar
