import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../../components/AcceptAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'

const AcceptAgreementPage: NextPage = () => {
  const [agreementId, setAgreementId] = useState<string>()
  const { isDisconnected } = useAccount()
  const router = useRouter()

  const loadAgreementByAddress = (partnerAddress: string) => {
    
  }

  const handleAgreementAccepted = () => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')
    // router.push('/')
  }
  const handleAgreementRefused = () => {
    toast(
      'Congrats! You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )
    // router.push('/')
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        <AcceptAgreementForm
          agreement={agreement}
          onAgreementAccepted={handleAgreementAccepted}
          onAgreementRefused={handleAgreementRefused}
        />
      </div>
    </MainLayout>
  )
}

export default AcceptAgreementPage
