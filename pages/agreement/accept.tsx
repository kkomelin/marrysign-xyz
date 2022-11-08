import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../../components/AcceptAgreementForm'
import { AppContext } from '../../components/context/AppContext'
import MainLayout from '../../components/layouts/MainLayout'
import { IAppContext } from '../../types/IAppContext'

const AcceptAgreementPage: NextPage = () => {
  const { isDisconnected, address } = useAccount()
  const { userAgreement } = useContext<IAppContext>(AppContext)
  const router = useRouter()

  const handleAgreementAccepted = async () => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')

    if (userAgreement) {
      router.push(`/agreeement/${userAgreement.id}`)
    }
  }
  const handleAgreementRefused = () => {
    toast(
      'Congrats! You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )
    router.push('/')
  }

  useEffect(() => {
    if (address == null) {
      return
    }

    if (userAgreement === null) {
      return
    }

    if (address !== userAgreement.bob) {
      toast.warn(
        'You cannot accept your own agreement. Please wait until your loved one accepts it.'
      )
      router.push(`/agreement/${userAgreement.id}`)
      return
    }
  }, [address, userAgreement])

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        {address != null &&
          userAgreement !== null &&
          address === userAgreement.bob && (
            <AcceptAgreementForm
              agreement={userAgreement}
              onAgreementAccepted={handleAgreementAccepted}
              onAgreementRefused={handleAgreementRefused}
            />
          )}
      </div>
    </MainLayout>
  )
}

export default AcceptAgreementPage
