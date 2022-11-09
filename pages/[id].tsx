import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BigNumberish, BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../components/AcceptAgreementForm'
import { AppContext } from '../components/context/AppContext'
import MainLayout from '../components/layouts/MainLayout'
import AgreementQRCode from '../components/misc/AgreementQRCode'
import TerminateAgreementForm from '../components/TerminateAgreementForm'
import { parseAgreementContent } from '../lib/content'
import { getAgreementById } from '../lib/contract/agreement'
import { contractStructToObject } from '../lib/contract/contractStructs'
import { contractStateToString } from '../lib/contract/helpers'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { EAgreementState } from '../types/EAgreementState'
import { IAppContext } from '../types/IAppContext'

const AgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const [agreement, setAgreement] = useState<MarrySign.AgreementStruct>()
  const { userAgreement, setUserAgreement, enableForceLoadUserAgreement } =
    useContext<IAppContext>(AppContext)
  const router = useRouter()
  const { address } = useAccount()

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

  const handleAgreementAccepted = (agreementId: BytesLike) => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')

    setAgreement({
      ...userAgreement,
      state: EAgreementState.Accepted,
    } as MarrySign.AgreementStruct)

    setUserAgreement({
      ...userAgreement,
      state: EAgreementState.Accepted,
    } as MarrySign.AgreementStruct)

    enableForceLoadUserAgreement()
  }
  const handleAgreementRefused = (agreementId: BytesLike) => {
    toast(
      'You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )

    setAgreement({
      ...userAgreement,
      state: EAgreementState.Refused,
    } as MarrySign.AgreementStruct)

    setUserAgreement({
      ...userAgreement,
      state: EAgreementState.Refused,
    } as MarrySign.AgreementStruct)

    enableForceLoadUserAgreement()
  }
  const handleAgreementTerminated = (agreementId: BytesLike) => {
    toast(
      "Your agreement has been terminated. We're sorry you had to do it but we'd be happy to see you again here."
    )

    setUserAgreement(null)

    enableForceLoadUserAgreement()

    router.push(`/`)
  }

  useEffect(() => {
    if (router.query.id == null) {
      return
    }

    loadAgreement(router.query.id.toString())
  }, [router])

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
          <div className="w-full max-w-sm text-center">
            <div className="flex flex-col items-center justify-center">
              <AgreementQRCode id={agreement.id as BytesLike} />
            </div>
            <div className="py-1 break-all">
              Agreement ID: <br /> {agreement.id.toString()}
            </div>
            <div className="py-1">
              Parties:
              <br />
              {agreementContent.partner2.name}
              <br />
              {agreementContent.partner1.name}
            </div>
            <div className="py-1">
              Vow:
              <br />
              {agreementContent.vow}
            </div>
            <div className="py-1">
              State:
              <br /> {contractStateToString(agreement.state as BigNumberish)}
            </div>
          </div>
        )}

        {address &&
          userAgreement &&
          address !== userAgreement.alice &&
          address === userAgreement.bob &&
          userAgreement.state == EAgreementState.Created && (
            <AcceptAgreementForm
              agreement={userAgreement}
              onAgreementAccepted={handleAgreementAccepted}
              onAgreementRefused={handleAgreementRefused}
            />
          )}

        {userAgreement && agreement && userAgreement.id === agreement.id && (
          <TerminateAgreementForm
            agreement={agreement}
            onAgreementTerminated={handleAgreementTerminated}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default AgreementPage
