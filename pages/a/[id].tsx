import { BytesLike, ethers } from 'ethers'
import JSConfetti from 'js-confetti'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AgreementInfoBlock from '../../components/blocks/AgreementInfoBlock'
import AgreementSharePopup from '../../components/blocks/AgreementSharePopup'
import AcceptAgreementForm from '../../components/forms/AcceptAgreementForm'
import CancelAgreementForm from '../../components/forms/CancelAgreementByTheOwnerForm'
import TerminateAgreementForm from '../../components/forms/TerminateAgreementForm'
import { useAppContext } from '../../components/hooks/useAppContext'
import MainLayout from '../../components/layouts/MainLayout'
import { parseAgreementContent } from '../../lib/content'
import { handleContractError } from '../../lib/helpers'
import { agreementMetaTitle } from '../../lib/helpers/meta'
import { getAgreementById } from '../../lib/services/agreement'
import { agreementStructToObject } from '../../lib/services/agreement/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { ECustomContractError } from '../../types/ECustomContractError'
import { ICustomContractError } from '../../types/ICustomContractError'

const AgreementPage: NextPage = () => {
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

  const fireConfetti = () => {
    const jsConfetti = new JSConfetti()
    jsConfetti.addConfetti({ confettiNumber: 150 })
    let count = 1
    const interval = setInterval(() => {
      if (count >= 3) {
        clearTimeout(interval)
        return
      }
      jsConfetti.addConfetti({ confettiNumber: 300 * count })
      count++
    }, 800)
  }

  const refreshAgreement = async (
    id: string,
    currentAgreement?: MarrySign.AgreementStruct,
    currentAddress?: string
  ) => {
    try {
      // We only refresh agreements in their Created or Accepted states.
      if (
        currentAgreement == null ||
        ![EAgreementState.Created, EAgreementState.Accepted].includes(
          currentAgreement?.state as EAgreementState
        )
      ) {
        return
      }

      const agreementNew = await getAgreementById(id)
      const updatedAgreement = agreementStructToObject(
        agreementNew
      ) as MarrySign.AgreementStruct

      // Nothing has changed, so there is nothing to do.
      if (currentAgreement.state === updatedAgreement.state) {
        return
      }

      // Notify Alice if the agreement has been accepted by Bob.
      if (
        updatedAgreement.state === EAgreementState.Accepted &&
        currentAddress === currentAgreement.alice
      ) {
        setAgreement(updatedAgreement)
        setUserAgreement(updatedAgreement)
        enableForceLoadUserAgreement()

        fireConfetti()
      }

      // Notify Alice if the agreement has been rejected by Bob.
      if (updatedAgreement.state === EAgreementState.Refused) {
        setAgreement(updatedAgreement)
        setUserAgreement(updatedAgreement)
        enableForceLoadUserAgreement()

        router.push('/')
        toast(
          'Your partner has refused to accept the agreement. Contact them or create a new one.'
        )
        return
      }

      // Notify Alice if the agreement has been terminated by Bob.
      if (updatedAgreement.state === EAgreementState.Terminated) {
        setAgreement(updatedAgreement)
        setUserAgreement(updatedAgreement)
        enableForceLoadUserAgreement()

        router.push('/')
        toast('Your partner has terminated the agreement.')
        return
      }
    } catch (e) {
      console.error(e)
    }
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
        agreementStructToObject(agreement) as MarrySign.AgreementStruct
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
    const updatedAgreement = {
      ...userAgreement,
      state: EAgreementState.Accepted,
    } as MarrySign.AgreementStruct

    setAgreement(updatedAgreement)
    setUserAgreement(updatedAgreement)

    enableForceLoadUserAgreement()

    // Decorate screen with confetti.
    fireConfetti()
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
    // @todo: It's better to add this check and load the agreement server-side in case we're not planning to host it statically.
    if (router.query.id == null) {
      return
    }

    loadAgreement(router.query.id.toString())
  }, [router])

  useEffect(() => {
    // // exit early when we reach 0
    // if (!timeLeft) return;

    if (router.query.id == null || address == null) {
      return
    }

    const intervalId = setInterval(() => {
      if (router.query.id == null || address == null) {
        return
      }

      refreshAgreement(router.query.id.toString(), agreement, address)
    }, 20000)

    return () => clearInterval(intervalId)
  }, [agreement, router, address])

  const agreementContent =
    agreement?.content &&
    ethers.utils.hexDataLength(agreement.content as BytesLike) > 0
      ? parseAgreementContent(agreement.content as BytesLike)
      : null

  // @todo Supply meta-data from server-side to make seo-friendly.
  const metaTitle = agreementMetaTitle(agreementContent, agreement)

  return (
    <MainLayout
      meta={
        metaTitle ? (
          <>
            <title key="title">{metaTitle}</title>
            <meta property="og:title" content={metaTitle} key="og:title" />
          </>
        ) : (
          <></>
        )
      }
    >
      <div className="flex flex-col items-center justify-center">
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

        {agreement && <AgreementSharePopup agreement={agreement} />}

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
          userAgreement.state === EAgreementState.Accepted && (
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
