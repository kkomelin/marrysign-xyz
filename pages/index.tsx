import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import AgreementList from '../components/AgreementList'
import { AppContext } from '../components/context/AppContext'
import ButtonLink from '../components/controls/ButtonLink'
import FrontpageLayout from '../components/layouts/FrontpageLayout'
import { getAcceptedAgreements } from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/contractStructs'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { IAppContext } from '../types/IAppContext'
import { ICustomContractError } from '../types/ICustomContractError'

const Home: NextPage = () => {
  const [agreements, setAgreements] = useState<MarrySign.AgreementStruct[]>([])
  const { userAgreement } = useContext<IAppContext>(AppContext)

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
      <ButtonLink href="/create">Let's get started</ButtonLink>

      <AgreementList
        agreements={agreements}
        userAgreementId={userAgreement?.id as BytesLike}
      />
    </FrontpageLayout>
  )
}

export default Home
