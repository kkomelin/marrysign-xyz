import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import ButtonLink from '../components/controls/ButtonLink'
import ConnectButton from '../components/controls/ConnectButton'
import { useAppContext } from '../components/hooks/useAppContext'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { getAcceptedAgreements } from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/contractStructs'
import { agreementPath, handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { ICustomContractError } from '../types/ICustomContractError'

const Home: NextPage = () => {
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const { userAgreement } = useAppContext()
  const { isConnected, isDisconnected } = useAccount()

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

  useEffect(() => {
    loadAgreements()
  }, [])

  return (
    <FrontpageLayout>
      {isConnected && userAgreement == null && (
        <ButtonLink href="/create">Let's get started</ButtonLink>
      )}
      {isConnected && userAgreement && (
        <ButtonLink href={agreementPath(userAgreement.id as BytesLike)}>
          My agreement
        </ButtonLink>
      )}

      {isDisconnected && <ConnectButton />}

      <AgreementList
        agreements={agreements}
        userAgreementId={userAgreement?.id as BytesLike}
      />
    </FrontpageLayout>
  )
}

export default Home
