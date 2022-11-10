import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../../components/AcceptAgreementForm'
import AgreementInfoWidget from '../../components/AgreementInfoWidget'
import CancelAgreementByTheOwnerForm from '../../components/CancelAgreementByTheOwnerForm'
import ConnectButton from '../../components/controls/ConnectButton'
import { useAppContext } from '../../components/hooks/useAppContext'
import MainLayout from '../../components/layouts/MainLayout'
import TerminateAgreementForm from '../../components/TerminateAgreementForm'
import { parseAgreementContent } from '../../lib/content'
import { getAgreementById } from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'

const AgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const [agreement, setAgreement] = useState<MarrySign.AgreementStruct>()
  const {
    userAgreement,
    setUserAgreement,
    enableForceLoadUserAgreement,
    showAppLoading,
    hideAppLoading,
  } = useAppContext()
  const router = useRouter()
  const { address } = useAccount()

  const loadAgreement = async (id: string) => {
    try {
      showAppLoading('Loading the agreement...')
      const agreement = await getAgreementById(id)
      setAgreement(
        contractStructToObject(agreement) as MarrySign.AgreementStruct
      )
      hideAppLoading()
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  const handleAgreementAccepted = (agreementId: BytesLike) => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')

    const updatedAgreement = {
      ...userAgreement,
      state: EAgreementState.Accepted,
    } as MarrySign.AgreementStruct

    setAgreement(updatedAgreement)
    setUserAgreement(updatedAgreement)

    enableForceLoadUserAgreement()
  }
  const handleAgreementRefused = (agreementId: BytesLike) => {
    toast(
      'You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )

    const updatedAgreement = {
      ...userAgreement,
      state: EAgreementState.Refused,
    } as MarrySign.AgreementStruct

    setAgreement(updatedAgreement)
    setUserAgreement(updatedAgreement)

    enableForceLoadUserAgreement()
  }
  const handleAgreementCancelled = (agreementId: BytesLike) => {
    toast(
      "You have successfullty cancelled your agreement. Your partner won't be able to accept it anymore."
    )

    const updatedAgreement = {
      ...userAgreement,
      state: EAgreementState.Refused,
    } as MarrySign.AgreementStruct

    setAgreement(updatedAgreement)
    setUserAgreement(updatedAgreement)

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
        {isDisconnected && <ConnectButton />}

        {agreement && agreementContent && (
          <AgreementInfoWidget
            agreement={agreement}
            agreementContent={agreementContent}
          />
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

        {address &&
          userAgreement &&
          address === userAgreement.alice &&
          address !== userAgreement.bob &&
          userAgreement.state == EAgreementState.Created && (
            <CancelAgreementByTheOwnerForm
              agreement={userAgreement}
              onAgreementCanceled={handleAgreementCancelled}
            />
          )}

        {userAgreement &&
          agreement &&
          userAgreement.id === agreement.id &&
          address !== userAgreement.alice && (
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
