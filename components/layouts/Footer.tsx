import { FC } from 'react'
import { APP_TWITTER_HANDLE } from '../../lib/config'

type Props = {}

const Footer: FC<Props> = () => {
  let twitterUrl = `https://twitter.com/${APP_TWITTER_HANDLE}`
  if (APP_TWITTER_HANDLE == 'kkomelin') {
    twitterUrl = 'https://twitter.com/kkomelin/status/1572157121214685184'
  }

  return (
    <footer className="flex flex-row items-center justify-center w-full py-6 text-gray-400 border-t">
      <span>For updates, follow</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block mx-1 text-indigo-400 hover:underline"
      >
        @{APP_TWITTER_HANDLE}
      </a>
    </footer>
  )
}

export default Footer
