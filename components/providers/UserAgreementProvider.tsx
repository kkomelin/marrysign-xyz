import '@rainbow-me/rainbowkit/styles.css'
import { BytesLike } from 'ethers'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { agreementPath, handleContractError } from '../../lib/helpers'
import { getAgreementByAddress } from '../../lib/services/agreement'
import { agreementStructToObject } from '../../lib/services/agreement/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { ECustomContractError } from '../../types/ECustomContractError'
import { ICustomContractError } from '../../types/ICustomContractError'
import { useAppContext } from '../hooks/useAppContext'

type Props = {}
const UserAgreementProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isDisconnected, address } = useAccount()
  const {
    setUserAgreement,
    userAgreement,
    showAppLoading,
    hideAppLoading,
    isForceLoadUserAgreementEnabled,
    disableForceLoadUserAgreement,
  } = useAppContext()
  const router = useRouter()

  const redirectToAgreement = (agreementId: BytesLike) => {
    return router.push(agreementPath(agreementId as BytesLike))
  }

  const loadAgreementByAddress = async (address: string) => {
    try {
      showAppLoading('Embrace the moment...')
      const agreement = await getAgreementByAddress(address)
      const converted = agreementStructToObject(agreement)
      setUserAgreement(converted as MarrySign.AgreementStruct)

      if (
        // We redirect Bob to the agreeemnt page if they have a Created agreeemnt
        (agreement.state === EAgreementState.Created &&
          agreement.bob === address) ||
        // We redirect anyone, who tries to access /create and has an Accepted agreement, to the agreement page.
        (router.asPath === '/create' &&
          agreement.state === EAgreementState.Accepted)
      ) {
        return redirectToAgreement(agreement.id as BytesLike)
      }
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        setUserAgreement(null)
      } else {
        handleContractError(e)
      }
    } finally {
      hideAppLoading()
    }
  }

  useEffect(() => {
    if (isDisconnected || address == null) {
      return
    }

    if (isForceLoadUserAgreementEnabled) {
      disableForceLoadUserAgreement()
      loadAgreementByAddress(address)
      return
    }

    if (userAgreement) {
      return
    }

    loadAgreementByAddress(address)
  }, [isDisconnected, address, userAgreement, isForceLoadUserAgreementEnabled])

  return <>{children}</>
}

export default UserAgreementProvider
