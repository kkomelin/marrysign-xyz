import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import CreateAgreementForm from '../../components/CreateAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'

const AgreementNewPage: NextPage = () => {
  const [lastAgreementId, setLastAgreementId] = useState<number>(-1)
  const { isDisconnected } = useAccount()

  const handleAgreementCreated = (agreementId: number) => {
    if (agreementId != lastAgreementId) {
      toast('Congrats! Your agreement has been created on blockchain!')
      setLastAgreementId(agreementId)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
      </div>
    </MainLayout>
  )
}

export default AgreementNewPage
