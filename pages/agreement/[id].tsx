import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumberish, BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { AppContext } from '../../components/context/AppContext'
import MainLayout from '../../components/layouts/MainLayout'
import { parseAgreementContent } from '../../lib/content'
import { getAgreementById } from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { contractStateToString } from '../../lib/contract/helpers'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { IAppContext } from '../../types/IAppContext'

const AgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const { setUserAgreement, userAgreement } =
    useContext<IAppContext>(AppContext)
  const router = useRouter()

  const loadAgreement = async (id: string) => {
    try {
      const agreement = await getAgreementById(id)
      setUserAgreement(
        contractStructToObject(agreement) as MarrySign.AgreementStruct
      )
    } catch (e) {
      handleContractError(e)
    }
  }

  const handleAgreementAccepted = () => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')
  }
  const handleAgreementRefused = () => {
    toast(
      'Congrats! You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )
  }

  useEffect(() => {
    if (isDisconnected) {
      return
    }
    if (router.query.id == null) {
      return
    }

    loadAgreement(router.query.id.toString())
  }, [isDisconnected, router])

  const agreementContent = userAgreement?.content
    ? parseAgreementContent(userAgreement?.content as BytesLike)
    : null

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        {userAgreement && agreementContent && (
          <div>
            <div>Agreement: {userAgreement.id.toString()}</div>
            <div>
              Parties:
              <br />
              {agreementContent.partner2.name}
              <br />
              {agreementContent.partner1.name}
            </div>
            <div>{agreementContent.vow}</div>
            <div>
              State:{' '}
              {contractStateToString(userAgreement.state as BigNumberish)}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default AgreementPage
