import '@rainbow-me/rainbowkit/styles.css'
import { BytesLike } from 'ethers'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getAgreementByAddress } from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { agreementPath, handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { ECustomContractError } from '../../types/ECustomContractError'
import { ICustomContractError } from '../../types/ICustomContractError'
import { useAppContext } from '../hooks/useAppContext'

type Props = {}
const UserAgreementProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isDisconnected, address, isConnected } = useAccount()
  const {
    setUserAgreement,
    userAgreement,
    appLoading,
    showAppLoading,
    hideAppLoading,
    isForceLoadUserAgreementEnabled,
    disableForceLoadUserAgreement,
  } = useAppContext()
  const router = useRouter()

  const loadAgreementByAddress = async (address: string) => {
    try {
      showAppLoading('Adapting the app for you...')
      const agreement = await getAgreementByAddress(address)
      const converted = contractStructToObject(agreement)
      setUserAgreement(converted as MarrySign.AgreementStruct)
      if (
        agreement.state === EAgreementState.Created &&
        agreement.bob === address
      ) {
        return router.push(agreementPath(agreement.id as BytesLike))
      }

      // If the user already has an accepted agreement, redirect them to the agreement page.
      if (
        router.asPath === '/create' &&
        agreement.state === EAgreementState.Accepted
      ) {
        return router.push(agreementPath(agreement.id as BytesLike))
      }
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        setUserAgreement(null)
        // return router.push('/create')
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

  // if (isConnected && appLoading) {
  //   return <>Loading...</>
  // }

  return <>{children}</>
}

export default UserAgreementProvider
