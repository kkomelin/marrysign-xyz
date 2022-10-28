import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import CreateAgreementForm from '../components/CreateAgreementForm'
import AgreementList from '../components/AgreementList'
import { getAgreements } from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import { MarrySign } from '../typechain'

const Home: NextPage = () => {
  const title = 'MarrySign'
  const description = 'We empower any couple to register marriage online'

  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const [lastAgreementId, setLastAgreementId] = useState<number>(-1)

  const loadAgreements = async () => {
    try {
      const agreements = await getAgreements()
      setAgreements(agreements)
    } catch (e) {
      handleException(e)
    }
  }

  const handleAgreementCreated = (agreementId: number) => {
    if (agreementId != lastAgreementId) {
      setLastAgreementId(agreementId)
    }
  }

  useEffect(() => {
    loadAgreements()
  }, [lastAgreementId])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-tertiary">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center w-full px-8 py-12 text-center grow">
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

          <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />

          <AgreementList agreements={agreements} />
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
