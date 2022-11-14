import { HeartIcon } from '@heroicons/react/20/solid'
import c from 'clsx'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { FC, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import ButtonLink from '../components/controls/ButtonLink'
import { useAppContext } from '../components/hooks/useAppContext'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { APP_DESCRIPTION } from '../lib/config'
import { agreementPath, handleContractErrorSilently } from '../lib/helpers'
import { getAcceptedAgreements } from '../lib/services/agreement'
import { contractStructToObject } from '../lib/services/agreement/helpers'
import { MarrySign } from '../typechain'
import { ICustomContractError } from '../types/ICustomContractError'

const Home: NextPage = () => {
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const { userAgreement } = useAppContext()
  const { isDisconnected } = useAccount()

  const loadAgreements = async () => {
    try {
      const agreements = await getAcceptedAgreements()
      setAgreements(
        agreements.map((agreement: any[]) => contractStructToObject(agreement))
      )
    } catch (e: ICustomContractError) {
      handleContractErrorSilently(e)
    }
  }

  useEffect(() => {
    if (isDisconnected) {
      return
    }
    loadAgreements()
  }, [])

  return (
    <FrontpageLayout>
      <div className="flex flex-col items-center justify-center p-5 mx-auto mb-10 sm:mb-10">
        <h2 className="pt-2 pb-6 text-3xl font-light leading-10 text-center sm:pb-8 sm:pt-4 sm:mt-4 text-secondary sm:text-5xl">
          {APP_DESCRIPTION}
        </h2>

        <div className="px-12 py-8 mt-4 bg-purple-400 rounded-lg shadow-sm sm:py-10 sm:px-14 bg-opacity-20">
          <ol>
            <li className="flex flex-row items-center mb-3 text-lg sm:mb-4 sm:text-xl last:mb-0">
              <HeartIcon className="w-4 mr-3 text-secondary" />
              <span>
                No <span className="text-secondary">age</span> restrictions
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
              Get crypto-married
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

      <div className="w-full py-20 bg-pink-50">
        <h2 id="how-it-works" className="px-4 pb-10 text-4xl text-center uppercase">
          How it works
        </h2>
        <div className="grid grid-cols-1 gap-10 px-6 sm:grid-cols-2 md:grid-cols-3">
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
              Celebrate your cripto-marriage together!
            </div>
          </div>
        </div>
      </div>

      {agreements.length > 0 && (
        <div className="w-full py-16 bg-white">
          <h2 className="px-4 py-10 text-4xl text-center">
            Crypto-couples
          </h2>
          <AgreementList
            agreements={agreements}
            userAgreementId={userAgreement?.id as BytesLike}
          />
        </div>
      )}
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
