import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { getAgreements } from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import { MarrySign } from '../typechain'

const Home: NextPage = () => {
  const { isDisconnected } = useAccount()
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])

  const loadAgreements = async () => {
    try {
      const agreements = await getAgreements()
      setAgreements(agreements)
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

  return (
    <FrontpageLayout>
      {isDisconnected && <ConnectButton label="Sign in" showBalance={false} />}

      <AgreementList agreements={agreements} />
    </FrontpageLayout>
  )
}

export default Home
