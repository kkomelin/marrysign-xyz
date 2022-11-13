import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import ButtonLink from '../components/controls/ButtonLink'
import { useAppContext } from '../components/hooks/useAppContext'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { APP_DESCRIPTION } from '../lib/config'
import { getAcceptedAgreements } from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/helpers'
import { agreementPath, handleContractErrorSilently } from '../lib/helpers'
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
    loadAgreements()
  }, [])

  return (
    <FrontpageLayout>
      <div className="flex flex-col items-center justify-center p-5 mx-auto mb-10 sm:mb-10">
        <h2 className="pb-8 text-3xl font-light leading-10 text-center sm:pt-4 sm:mt-4 text-secondary sm:text-5xl">
          {APP_DESCRIPTION}
        </h2>

        <div className="px-12 py-8 mt-4 bg-purple-400 rounded-lg shadow-sm sm:py-10 sm:px-14 bg-opacity-20">
          <ol>
            <li className="mb-4 text-lg sm:text-xl last:mb-0">
              No <span className="text-secondary">age</span> restrictions
            </li>
            <li className="mb-4 text-lg sm:text-xl last:mb-0">
              No <span className="text-secondary">location</span> restrictions
            </li>
            <li className="mb-4 text-lg sm:text-xl last:mb-0">
              No <span className="text-secondary">culture</span> restrictions
            </li>
            <li className="mb-4 text-lg sm:text-xl last:mb-0">
              No <span className="text-secondary">gender</span> restrictions
            </li>
          </ol>
        </div>

        <div className="flex flex-row justify-center py-4 mt-5">
          {isDisconnected || userAgreement == null ? (
            <ButtonLink href="/create" size="large" color="secondary">
              Let's get started
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

      <div className="w-full py-10 bg-white">
        <h2 id="how-it-works" className="px-4 py-10 text-4xl text-center">
          How it works
        </h2>
      </div>

      {agreements.length > 0 && (
        <div className="w-full py-10 bg-white">
          <h2 className="px-4 py-10 text-4xl text-center">
            Happily married with us
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
