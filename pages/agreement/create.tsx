import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import CreateAgreementForm from '../../components/CreateAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'

const CreateAgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const router = useRouter()

  const handleAgreementCreated = () => {
    toast('Congrats! Your agreement has been created on blockchain!')
    router.push('/')
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

export default CreateAgreementPage
