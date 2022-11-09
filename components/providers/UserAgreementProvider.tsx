import '@rainbow-me/rainbowkit/styles.css'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useContext, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { getAgreementByAddress } from '../../lib/contract/agreement'
import { contractStructToObject } from '../../lib/contract/contractStructs'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { ECustomContractError } from '../../types/ECustomContractError'
import { IAppContext } from '../../types/IAppContext'
import { ICustomContractError } from '../../types/ICustomContractError'
import { AppContext } from '../context/AppContext'

type Props = {}
const UserAgreementProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { isDisconnected, address, isConnected } = useAccount()
  const {
    setUserAgreement,
    userAgreement,
    appLoading,
    setAppLoading,
    isForceLoadUserAgreementEnabled,
    disableForceLoadUserAgreement,
  } = useContext<IAppContext>(AppContext)
  const router = useRouter()

  const loadAgreementByAddress = async (address: string) => {
    try {
      const agreement = await getAgreementByAddress(address)
      const converted = contractStructToObject(agreement)
      setUserAgreement(converted as MarrySign.AgreementStruct)
      if (
        agreement.state === EAgreementState.Created &&
        agreement.bob === address
      ) {
        return router.push(`/${agreement?.id.toString()}`)
      }
    } catch (e: ICustomContractError) {
      if (e.errorName === ECustomContractError.AgreementNotFound) {
        setUserAgreement(null)
        // return router.push('/create')
      } else {
        handleContractError(e)
      }
    } finally {
      setAppLoading(false)
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

  if (isConnected && appLoading) {
    return <>Loading...</>
  }

  return <>{children}</>
}

export default UserAgreementProvider
