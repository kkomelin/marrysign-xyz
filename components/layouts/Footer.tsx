import { FC } from 'react'
import { APP_NAME, APP_TWITTER_HANDLE } from '../../lib/config'

type Props = {}

const Footer: FC<Props> = () => {
  let twitterUrl = `https://twitter.com/${APP_TWITTER_HANDLE}`
  if (APP_TWITTER_HANDLE == 'kkomelin') {
    twitterUrl = 'https://twitter.com/kkomelin/status/1572157121214685184'
  }

  return (
    <footer className="flex flex-col items-center justify-center w-full text-gray-500 bg-purple-100 ">
      <Follow twitterUrl={twitterUrl} />
      <Disclaimer />
    </footer>
  )
}

type FollowProps = {
  twitterUrl: string
}
const Follow: FC<FollowProps> = ({ twitterUrl }) => {
  return (
    <div className="flex flex-row items-center justify-center w-full px-4 py-8 bg-pink-50 ">
      <span>For updates, follow</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block mx-1 text-indigo-400 hover:underline"
      >
        @{APP_TWITTER_HANDLE}
      </a>
    </div>
  )
}

const Disclaimer: FC = () => {
  return (
    <div className="flex flex-row justify-center w-full px-4 py-4 text-sm text-gray-500">
      <div className="max-w-xl text-left">
        <p>
          * Please note {APP_NAME} agreements don't have legal power, at least
          not yet.
        </p>
        <p>
          ** We store agreement data on Blockchain, which is a public storage by
          its nature, so user data privacy can not be ensured nor guaranteed.
        </p>
        <p>*** The app is still under development, so use it with caution.</p>
      </div>
    </div>
  )
}

export default Footer
