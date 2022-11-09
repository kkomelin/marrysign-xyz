import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import { AppContext } from '../components/context/AppContext'
import ButtonLink from '../components/controls/ButtonLink'
import ConnectButton from '../components/controls/ConnectButton'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { getAcceptedAgreements } from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/contractStructs'
import { agreementPath, handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { IAppContext } from '../types/IAppContext'
import { ICustomContractError } from '../types/ICustomContractError'

const Home: NextPage = () => {
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const { userAgreement } = useContext<IAppContext>(AppContext)
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
