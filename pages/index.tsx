import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { getAgreementCount } from '../lib/contract/contract'

const Home: NextPage = () => {
  const title = 'MarrySign'
  const description = 'We empower any couple to register marriage online'
  return (
    <div className="bg-[#fcf6fa] h-screen flex flex-col justify-center items-center">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center px-8 text-center grow">
        <h1>
          <a
            href="https://marrysign.com"
            className="text-5xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {title}
          </a>
        </h1>

        <p className="my-8 text-2xl font-light leading-8 text-gray-500 sm:text-3xl">
          {description}
        </p>

        <div className="flex flex-col items-center justify-center">
          <ConnectButton label="Sign in" showBalance={false} />

          <button
            className="block px-3 py-2 mt-3 text-white border rounded-lg bg-secondary"
            onClick={async () => {
              try {
                const count = await getAgreementCount()
                toast(`Current agreement count is ${count}`)
              } catch (e) {
                toast.error('An error has occurred. Please contact support.')
                console.error(e)
              }
            }}
          >
            getAgreementCount
          </button>
        </div>
      </main>

      <footer className="flex flex-row items-center justify-center w-full py-6 text-gray-400 border-t">
        <span>For updates, follow</span>
        <a
          href="https://twitter.com/kkomelin/status/1572157121214685184"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block mx-1 text-indigo-400 hover:underline"
        >
          @kkomelin
        </a>
      </footer>
    </div>
  )
}

export default Home
