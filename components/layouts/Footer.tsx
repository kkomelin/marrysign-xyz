import Link from 'next/link'
import { FC, useEffect } from 'react'
import {
  APP_NAME,
  APP_TWITTER_HANDLE,
  CONTACT_FOUNDER_LINK,
} from '../../lib/config'

type Props = {}
const Footer: FC<Props> = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full text-gray-500 bg-purple-100 ">
      {/* <JoinWaitlist /> */}
      <Follow />
      <Disclaimer />
    </footer>
  )
}

const Follow: FC = () => {
  useEffect(() => {
    const s = document.createElement('script')
    s.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    s.setAttribute('async', 'true')
    document.head.appendChild(s)
  }, [])

  return (
    <div className="flex flex-row items-center justify-center w-full px-4 py-8 bg-pink-50">
      <a
        className="twitter-follow-button"
        href={`https://twitter.com/${APP_TWITTER_HANDLE}`}
        data-size="large"
        data-show-count={false}
      >
        Follow @{APP_TWITTER_HANDLE}
      </a>
    </div>
  )
}

const Disclaimer: FC = () => {
  return (
    <div className="flex flex-row justify-center w-full px-4 py-8 text-sm text-gray-500">
      <div className="max-w-xl text-left">
        <p className="mb-2">
          Please note {APP_NAME} agreements don't have legal power, at least not
          yet.
        </p>
        <p className="mb-2">
          We store agreement data on Blockchain, which is public by its nature,
          so user data privacy can not be ensured nor guaranteed.
        </p>
        <p className="mb-2">
          The blockchain part is{' '}
          <a
            href="https://github.com/kkomelin/marrysign"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Open Source
          </a>
          , so you can always audit it.
        </p>
        <p className="mb-2 font-bold text-pink-600">
          The project has been discontinued. Have an idea or like the domain
          name?{' '}
          <Link
            href={CONTACT_FOUNDER_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 underline"
          >
            Contact the founder
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Footer
