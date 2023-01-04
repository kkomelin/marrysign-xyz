import { FC, useEffect } from 'react'
import { APP_NAME, APP_TWITTER_HANDLE } from '../../lib/config'

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
        <p className="mb-2">
          If you experience any issues or have improvement suggestions, please{' '}
          <a href="mailto:support@marrysign.com">contact us</a>.
        </p>
      </div>
    </div>
  )
}

export default Footer
