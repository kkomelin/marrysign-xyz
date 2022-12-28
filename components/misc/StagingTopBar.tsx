import Link from 'next/link'
import { FC } from 'react'
import { APP_URL } from '../../lib/config'

const StagingTopBar: FC = () => {
  return (
    <div className="flex-col items-center justify-center w-full gap-1 p-3 text-sm text-white bg-blue-400 md:flex md:flex-row">
      <span>This is a test (Goerli) version.</span>{' '}
      <Link href={APP_URL} className="text-white underline">
        Go to Production one?
      </Link>
    </div>
  )
}

export default StagingTopBar
