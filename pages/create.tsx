import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { AppContext } from '../components/context/AppContext'
import ConnectButton from '../components/controls/ConnectButton'
import CreateAgreementForm from '../components/CreateAgreementForm'
import MainLayout from '../components/layouts/MainLayout'
import ShareWithPartnerWidget from '../components/ShareWithPartnerWidget'
import { EAgreementState } from '../types/EAgreementState'
import { IAppContext } from '../types/IAppContext'

const WizardPage: NextPage = () => {
  const { isDisconnected, isConnected, address } = useAccount()
  const { userAgreement, enableForceLoadUserAgreement } =
    useContext<IAppContext>(AppContext)
  const router = useRouter()

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
        <h2 className="text-lg font-bold">3 easy steps:</h2>

        <div>
          <h3 className="font-bold">
            {isConnected && <>(done)</>} 1. Connect with your wallet
          </h3>
          {isDisconnected && <ConnectButton />}
        </div>

        <div>
          <h3 className="font-bold">
            {isConnected && userAgreement && <>(done)</>} 2. Create your
            agreement
          </h3>
          {isConnected && userAgreement == null && (
            <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
          )}
        </div>

        <div>
          <h3 className="font-bold">
            3. Share with your partner
          </h3>
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
