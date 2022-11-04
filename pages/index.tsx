import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import {
  getAcceptedAgreements,
  getAgreementByAddress,
} from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import { MarrySign } from '../typechain'

const Home: NextPage = () => {
  const { isDisconnected, address } = useAccount()
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const [userAgreement, setUserAgreement] =
    useState<MarrySign.AgreementStruct>()

  const loadAgreements = async () => {
    try {
      const agreements = await getAcceptedAgreements()
      setAgreements(agreements)
    } catch (e) {
      handleException(e)
    }
  }

  const loadAgreementByAddress = async (address: string) => {
    console.log(address)
    try {
      const agreement = await getAgreementByAddress(address)
      setUserAgreement(agreement)
      console.log(agreement)
    } catch (e) {
      handleException(e)
    }
  }

  useEffect(() => {
    if (isDisconnected) {
      return
    }
    loadAgreements()
  }, [isDisconnected])

  useEffect(() => {
    if (isDisconnected) {
      return
    }
    if (address == null) {
      return
    }

    loadAgreementByAddress(address)
  }, [address, isDisconnected])

  return (
    <FrontpageLayout>
      {isDisconnected && <ConnectButton label="Sign in" showBalance={false} />}

      <AgreementList agreements={agreements} />
    </FrontpageLayout>
  )
}

export default Home
