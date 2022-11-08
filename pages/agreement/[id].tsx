import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumberish, BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { AppContext } from '../../components/context/AppContext'
import Button from '../../components/controls/Button'
import MainLayout from '../../components/layouts/MainLayout'
import { parseAgreementContent } from '../../lib/content'
import {
  getAgreementByAddress,
  getAgreementById,
} from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { contractStateToString } from '../../lib/contract/helpers'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { ECustomContractError } from '../../types/ECustomContractError'
import { IAppContext } from '../../types/IAppContext'
import { ICustomContractError } from '../../types/ICustomContractError'

const AgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const [agreement, setAgreement] = useState<MarrySign.AgreementStruct>()
  const { userAgreement, setUserAgreement } =
    useContext<IAppContext>(AppContext)
  const router = useRouter()
  const { address, isConnected } = useAccount()

  const loadAgreement = async (id: string) => {
    try {
      const agreement = await getAgreementById(id)
      setAgreement(
        contractStructToObject(agreement) as MarrySign.AgreementStruct
      )
    } catch (e) {
      handleContractError(e)
    }
  }

  const loadAgreementByAddress = async (address: string) => {
    try {
      const agreement = await getAgreementByAddress(address)
      const converted = contractStructToObject(agreement)
      setUserAgreement(converted as MarrySign.AgreementStruct)
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        return
      }

      handleContractError(e)
    }
  }

  useEffect(() => {
    if (router.query.id == null) {
      return
    }

    loadAgreement(router.query.id.toString())
  }, [router])

  useEffect(() => {
    if (userAgreement) {
      return
    }

    if (isDisconnected || address == null) {
      return
    }

    loadAgreementByAddress(address)
  }, [isDisconnected, address, userAgreement])

  const agreementContent = agreement?.content
    ? parseAgreementContent(agreement?.content as BytesLike)
    : null

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        {agreement && agreementContent && (
          <div>
            <div>Agreement: {agreement.id.toString()}</div>
            <div>
              Parties:
              <br />
              {agreementContent.partner2.name}
              <br />
              {agreementContent.partner1.name}
            </div>
            <div>{agreementContent.vow}</div>
            <div>
              State: {contractStateToString(agreement.state as BigNumberish)}
            </div>
          </div>
        )}

        {userAgreement && agreement && userAgreement.id === agreement.id && (
          <Button onClick={() => alert('terminate')}>Terminate</Button>
        )}
      </div>
    </MainLayout>
  )
}

export default AgreementPage
