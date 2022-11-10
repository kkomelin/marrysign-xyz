import { BytesLike, ethers } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AgreementInfoBlock from '../../components/blocks/AgreementInfoBlock'
import ConnectButton from '../../components/controls/ConnectButton'
import AcceptAgreementForm from '../../components/forms/AcceptAgreementForm'
import CancelAgreementForm from '../../components/forms/CancelAgreementByTheOwnerForm'
import TerminateAgreementForm from '../../components/forms/TerminateAgreementForm'
import { useAppContext } from '../../components/hooks/useAppContext'
import MainLayout from '../../components/layouts/MainLayout'
import { parseAgreementContent } from '../../lib/content'
import { getAgreementById } from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { ECustomContractError } from '../../types/ECustomContractError'
import { ICustomContractError } from '../../types/ICustomContractError'

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

  const agreementNotFound = () => {
    toast.warn('The agreement your were trying to access does not exist.')
    return router.push('/')
  }

  const loadAgreement = async (id: string) => {
    try {
      showAppLoading('Loading the agreement...')
      const agreement = await getAgreementById(id)
      if (agreement.state === EAgreementState.Terminated) {
        hideAppLoading()
        return agreementNotFound()
      }
      setAgreement(
        contractStructToObject(agreement) as MarrySign.AgreementStruct
      )
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        hideAppLoading()
        return agreementNotFound()
      }
      handleContractError(e)
    } finally {
      hideAppLoading()
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

  const agreementContent =
    agreement?.content &&
    ethers.utils.hexDataLength(agreement.content as BytesLike) > 0
      ? parseAgreementContent(agreement.content as BytesLike)
      : null

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && <ConnectButton />}

        {agreement && agreementContent && (
          <AgreementInfoBlock
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
            <CancelAgreementForm
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
