import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import ConnectButton from '../components/controls/ConnectButton'
import CreateAgreementForm from '../components/CreateAgreementForm'
import { useAppContext } from '../components/hooks/useAppContext'
import MainLayout from '../components/layouts/MainLayout'
import ShareWithPartnerWidget from '../components/ShareWithPartnerWidget'
import { EAgreementState } from '../types/EAgreementState'

const WizardPage: NextPage = () => {
  const { isDisconnected, isConnected, address } = useAccount()
  const { userAgreement, enableForceLoadUserAgreement } = useAppContext()

  const handleAgreementCreated = (agreementId: BytesLike) => {
    toast(
      'Congrats! Your agreement has been created. Time to send it to your loved one.'
    )

    enableForceLoadUserAgreement()

    // router.push(agreementPath(agreement.id as BytesLike))
  }

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">3 easy steps:</h2>

        <div className="py-2 my-2">
          <h3 className="font-semibold">
            1. Connect with your wallet {isConnected && <>(done)</>}
          </h3>
          {isDisconnected && <ConnectButton />}
        </div>

        <div className="py-2 my-2">
          <h3 className="font-semibold">
            2. Create your agreement{' '}
            {isConnected && userAgreement && <>(done)</>}
          </h3>
          {isConnected && userAgreement == null && (
            <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
          )}
        </div>

        <div className="py-2 my-2">
          <h3 className="font-semibold">3. Share with your partner</h3>
          {userAgreement &&
            userAgreement.state == EAgreementState.Created &&
            userAgreement.alice === address && (
              <ShareWithPartnerWidget agreement={userAgreement} />
            )}
        </div>
      </div>
    </MainLayout>
  )
}

export default WizardPage
