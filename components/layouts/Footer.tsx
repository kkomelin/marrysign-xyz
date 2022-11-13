import { FC } from 'react'
import { APP_TWITTER_HANDLE } from '../../lib/config'
import Disclaimer from '../misc/Disclaimer'

type Props = {}

const Footer: FC<Props> = () => {
  let twitterUrl = `https://twitter.com/${APP_TWITTER_HANDLE}`
  if (APP_TWITTER_HANDLE == 'kkomelin') {
    twitterUrl = 'https://twitter.com/kkomelin/status/1572157121214685184'
  }

  return (
    <footer className="flex flex-col items-center justify-center w-full py-6 text-gray-500 bg-purple-100">
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
    <div className="flex flex-row items-center justify-center w-full">
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

export default Footer
