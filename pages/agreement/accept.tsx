import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../../components/AcceptAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'

const AcceptAgreementPage: NextPage = () => {
  const [txRegistered, setTxRegistered] = useState<boolean>(false)
  const { isDisconnected } = useAccount()
  const router = useRouter()

  const loadAgreement = () => {
    
  }

  const handleAgreementAccepted = (agreementId: number) => {
    console.log(agreementId)
    if (!txRegistered) {
      setTxRegistered(true)
      return
    }

    router.push('/')
    toast('Congrats! Your agreement has been created on blockchain!')
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        <AcceptAgreementForm onAgreementAccepted={handleAgreementAccepted} />
      </div>
    </MainLayout>
  )
}

export default AcceptAgreementPage
