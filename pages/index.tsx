import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import { AppContext } from '../components/context/AppContext'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import {
  getAcceptedAgreements,
  getAgreementByAddress,
} from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/contractStructs'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { EAgreementState } from '../types/EAgreementState'
import { ECustomContractError } from '../types/ECustomContractError'
import { IAppContext } from '../types/IAppContext'
import { ICustomContractError } from '../types/ICustomContractError'

const Home: NextPage = () => {
  const { isDisconnected, address } = useAccount()
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const { setUserAgreement, userAgreement } =
    useContext<IAppContext>(AppContext)
  const router = useRouter()

  const loadAgreements = async () => {
    try {
      const agreements = await getAcceptedAgreements()
      setAgreements(
        agreements.map((agreement: any[]) => contractStructToObject(agreement))
      )
    } catch (e: ICustomContractError) {
      handleContractError(e)
    }
  }

  const loadAgreementByAddress = async (address: string) => {
    try {
      const agreement = await getAgreementByAddress(address)
      const converted = contractStructToObject(agreement)
      setUserAgreement(converted as MarrySign.AgreementStruct)
      if (
        agreement.state === EAgreementState.Created &&
        agreement.bob === address
      ) {
        return router.push('/agreement/accept')
      }
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        return router.push('/agreement/create')
      }

      handleContractError(e)
    }
  }

  useEffect(() => {
    loadAgreements()
  }, [])

  useEffect(() => {
    if (isDisconnected || address == null) {
      return
    }

    loadAgreementByAddress(address)
  }, [isDisconnected, address])

  return (
    <FrontpageLayout>
      {isDisconnected && <ConnectButton label="Sign in" showBalance={false} />}

      <AgreementList
        agreements={agreements}
        userAgreementId={userAgreement?.id as BytesLike}
      />
    </FrontpageLayout>
  )
}

export default Home
