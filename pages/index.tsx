import { HeartIcon } from '@heroicons/react/20/solid'
import c from 'clsx'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import FaqBlock from '../components/blocks/FaqBlock'
import ButtonLink from '../components/controls/ButtonLink'
import { useAppContext } from '../components/hooks/useAppContext'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { AGREEMENT_EXAMPLE_ID, APP_NAME, APP_SLOGAN } from '../lib/config'
import { agreementPath, handleContractErrorSilently } from '../lib/helpers'
import { getAgreementCount } from '../lib/services/agreement'
import { convertETHToUSD } from '../lib/services/price/coinstats'
import { ICustomContractError } from '../types/ICustomContractError'

const CREATE_AGREEMENT_FEE_ETH = 0.0066
const OTHER_AGREEMENT_OPS_FEE_ETH = 0.0016

const agreementExampleId =
  process.env.NEXT_PUBLIC_AGREEMENT_EXAMPLE_ID || AGREEMENT_EXAMPLE_ID

const Home: NextPage = () => {
  // const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const [agreementCount, setAgreementCount] = useState<number>(0)
  const { userAgreement } = useAppContext()
  const { isDisconnected } = useAccount()
  const [valueInUSD, setValueInUSD] = useState<string | undefined>(undefined)

  // const loadAgreements = async () => {
  //   try {
  //     const agreements = await getAgreementCount()
  //     setAgreements(
  //       agreements.map((agreement: any[]) => contractStructToObject(agreement))
  //     )
  //   } catch (e: ICustomContractError) {
  //     handleContractErrorSilently(e)
  //   }
  // }

  // useEffect(() => {
  //   if (isDisconnected) {
  //     return
  //   }
  //   loadAgreements()
  // }, [])

  const fetchAgreementCount = async () => {
    try {
      const count = await getAgreementCount()
      setAgreementCount(count)
    } catch (e: ICustomContractError) {
      handleContractErrorSilently(e)
    }
  }

  useEffect(() => {
    convertETHToUSD('1').then((amountInUSD: string) => {
      if (amountInUSD) {
        setValueInUSD(amountInUSD)
      }
    })

    fetchAgreementCount()
  }, [])

  return (
    <FrontpageLayout>
      <div className="flex flex-col items-center justify-center p-5 mx-auto mb-10 sm:mb-10">
        <h2 className="pt-2 pb-6 text-3xl font-light leading-10 text-center sm:pb-8 sm:pt-4 sm:mt-4 text-secondary sm:text-5xl">
          {APP_SLOGAN}
        </h2>

        <div className="px-12 py-8 mt-4 bg-purple-400 rounded-lg shadow-sm sm:py-10 sm:px-14 bg-opacity-20">
          <ol>
            <li className="flex flex-row items-center mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              <HeartIcon className="w-4 mr-3 text-secondary" />
              <span>
                No <span className="text-secondary">time</span> restrictions
              </span>
            </li>
            <li className="flex flex-row items-center mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              <HeartIcon className="w-4 mr-3 text-secondary" />
              <span>
                No <span className="text-secondary">location</span> restrictions
              </span>
            </li>
            <li className="flex flex-row items-center mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              <HeartIcon className="w-4 mr-3 text-secondary" />
              <span>
                No <span className="text-secondary">culture</span> restrictions
              </span>
            </li>
            <li className="flex flex-row items-center mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              <HeartIcon className="w-4 mr-3 text-secondary" />
              <span>
                No <span className="text-secondary">gender</span> restrictions
              </span>
            </li>
            {/* <li className="mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              Absolutely no <span className="text-secondary">bs</span>
            </li> */}
          </ol>
        </div>

        <div className="flex flex-row justify-center py-4 mt-5">
          {isDisconnected || userAgreement == null ? (
            <ButtonLink href="/create" size="large" color="secondary">
              Get Crypto-Married
            </ButtonLink>
          ) : (
            <ButtonLink
              href={agreementPath(userAgreement.id as BytesLike)}
              size="large"
              color="secondary"
            >
              My agreement
            </ButtonLink>
          )}
        </div>
      </div>

      <div className="w-full px-6 py-10 text-2xl font-semibold text-center text-white uppercase bg-pink-300">
        Closer than <span className="text-secondary">Copenhagen</span> & quicker
        than <span className="text-secondary">Las Vegas</span>
      </div>

      <div className="w-full py-16 bg-white md:py-20">
        <h2
          id="about"
          className="px-4 pb-10 text-4xl text-center uppercase md:pb-6"
        >
          Our Story
        </h2>
        <div className="flex flex-col justify-center px-6 mx-auto md:flex-row">
          <div className="flex flex-col items-center justify-center md:pr-14 min-w-[180px]">
            <Image
              width={180}
              height={180}
              src="/images/frontpage/konstantin-photo.png"
              alt={APP_NAME + " Founder's Photo"}
              className="bg-purple-400 rounded-full shadow-sm bg-opacity-20"
            />
          </div>
          <div className="max-w-3xl mt-8 text-base text-left md:text-lg ">
            <p className="pb-3">Welcome to {APP_NAME}, friends!</p>
            <p className="pb-3">
              I'm Konstantin, a web developer and {APP_NAME} founder.
            </p>

            <p className="pb-3">
              My lovely spouse Irina and I lived together for a few years until
              we decided to get married. It was a well-thought decision, you
              know. And when we finally came to the registration office, they
              turned us around and forced us to wait for two months because of
              "the standard procedures".
            </p>
            <p className="pb-3">
              When my gay friends decided to get married, they had to go to
              Denmark because same-sex marriages were totally illegal in their
              country.
            </p>
            <p className="pb-3">
              I know couples which took loans to just please hundreds of guests
              at their wedding as if it's not their personal holiday.
            </p>
            <p className="pb-3">
              Does it all sound right to you? To me, it's not. That's why I
              started {APP_NAME}, a cheap, quick and unrestricted alternative to
              traditional marriages.
            </p>

            <ButtonLink
              href="/create"
              color="secondary"
              className="max-w-sm mx-auto mt-6 text-center md:mx-0"
            >
              Are you with us?
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="w-full py-16 md:py-20 bg-pink-50">
        <h2
          id="how-it-works"
          className="px-4 pb-10 text-4xl text-center uppercase"
        >
          How it works
        </h2>
        <div className="grid max-w-6xl grid-cols-1 gap-10 px-6 mx-auto mt-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col justify-center p-5 text-center bg-white border rounded-lg border-primary min-h-[150px]">
            <StepNumber step={1} className="bg-primary" />
            Login with your Ethereum wallet, e.g.{' '}
            <a
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="https://metamask.io/"
            >
              Metamask
            </a>
          </div>
          <div className="flex flex-col justify-center p-5 text-center bg-white border rounded-lg border-primary min-h-[150px]">
            <StepNumber step={2} className="bg-primary" />
            Create an agreement with your couple details
          </div>
          <div className="flex flex-col justify-center p-5 text-center bg-white border rounded-lg border-primary min-h-[150px]">
            <StepNumber step={3} className="bg-primary" />
            Invite your partner to accept the agreement
          </div>
          <div className="flex flex-col justify-center p-5 text-center bg-white border rounded-lg border-secondary min-h-[150px]">
            <StepNumber step={4} className="bg-secondary" />
            Your partner logins and accepts the agreement
          </div>
          <div className="flex flex-col justify-center p-px text-center bg-white rounded-lg bg-gradient-to-r from-purple-400 to-pink-600 min-h-[150px]">
            <div className="flex flex-col justify-center w-full h-full p-5 bg-white rounded-lg">
              <StepNumber
                step={5}
                className="bg-gradient-to-r from-purple-400 to-pink-600"
              />
              Celebrate your crypto-marriage together!
            </div>
          </div>
          <div className="flex flex-col justify-center p-5 text-center min-h-[150px] items-center">
            <ButtonLink size="large" href="/create" color="secondary">
              Let's get started
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-10 text-2xl font-semibold text-center text-white uppercase bg-violet-400">
        {agreementCount > 0 ? (
          <div>
            {agreementCount} agreement{agreementCount > 1 ? 's' : ''} created
          </div>
        ) : (
          <div>...</div>
        )}
        <Link
          href={agreementPath(agreementExampleId)}
          className="text-base text-yellow-200 underline normal-case underline-offset-2"
        >
          agreement example
        </Link>
      </div>

      <div className="w-full px-6 py-16 border-primary md:py-20 bg-pink-50">
        <h2 id="pricing" className="px-4 pb-10 text-4xl text-center uppercase">
          Pricing
        </h2>
        <div className="flex flex-col justify-center max-w-md mx-auto">
          <div className="flex flex-col justify-start p-5 text-center bg-white border rounded-lg border-primary min-h-[150px]">
            <div className="text-xl font-bold text-primary">Free Beta</div>
            <div className="flex flex-row justify-between mt-4">
              <div>Service fees</div>
              <div className="font-semibold">0</div>
            </div>
            <div className="flex flex-col items-start justify-start mt-3">
              <div className="mb-1 font-semibold text-left">
                Ethereum network fees
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between mt-2">
                  <div className="text-left">Create agreement</div>
                  <div className="font-semibold text-right">
                    ~{CREATE_AGREEMENT_FEE_ETH} ETH{' '}
                    <div className="text-sm font-normal">
                      {valueInUSD &&
                        valueInUSD !== '0' &&
                        `($${(
                          CREATE_AGREEMENT_FEE_ETH * parseFloat(valueInUSD)
                        ).toFixed(2)} USD)`}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between mt-2">
                  <div className="text-left">Other operations</div>
                  <div className="font-semibold text-right">
                    ~{OTHER_AGREEMENT_OPS_FEE_ETH} ETH{' '}
                    <div className="text-sm font-normal">
                      {valueInUSD &&
                        valueInUSD !== '0' &&
                        `($${(
                          OTHER_AGREEMENT_OPS_FEE_ETH * parseFloat(valueInUSD)
                        ).toFixed(2)} USD)`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start mt-3 text-xs text-left md:text-sm text-accent2">
              * Provided Ethereum network fees are not constant and depend of
              current Ethereum price and network load.
            </div>
          </div>

          <div>
            <ButtonLink
              href="/create"
              color="secondary"
              className="max-w-xs mx-auto mt-8 text-center"
            >
              Get crypto-married now
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-16 bg-white border-primary md:py-20">
        <h2 id="faq" className="px-4 pb-10 text-4xl text-center uppercase">
          FAQ
        </h2>
        <div className="flex flex-col justify-center max-w-2xl mx-auto">
          <FaqBlock />
        </div>
      </div>

      {/* {agreements.length > 0 && (
        <div className="w-full py-16 bg-white">
          <h2 className="px-4 pb-10 text-4xl text-center uppercase">
            Happily Crypto-Married
          </h2>
          <AgreementList
            agreements={agreements}
            userAgreementId={userAgreement?.id as BytesLike}
          />
        </div>
      )} */}
    </FrontpageLayout>
  )
}

export default Home

type StepNumberProps = {
  step: number
  className?: string
}
const StepNumber: FC<StepNumberProps> = ({ step, className }) => {
  return (
    <div
      className={c(
        'flex flex-col items-center justify-center w-10 h-10 mx-auto mb-4 text-lg font-bold text-white rounded-full',
        className
      )}
    >
      {step}
    </div>
  )
}
