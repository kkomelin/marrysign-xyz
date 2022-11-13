import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import ShareWithPartnerBlock from '../components/blocks/ShareWithPartnerBlock'
import ConnectButton from '../components/controls/ConnectButton'
import CreateAgreementForm from '../components/forms/CreateAgreementForm'
import { useAppContext } from '../components/hooks/useAppContext'
import MainLayout from '../components/layouts/MainLayout'
import AccordionItem from '../components/misc/AccordionItem'
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
      <div className="flex flex-col w-full">
        <h2 className="mt-2 mb-10 text-3xl font-light leading-10 text-center text-secondary">
          Just 3 simple steps
        </h2>

        <AccordionItem
          title="1. Login with your wallet"
          defaultOpen={!isConnected}
          completed={isConnected}
        >
          {isDisconnected && (
            <div className="my-6">
              <ConnectButton />
            </div>
          )}
        </AccordionItem>

        <AccordionItem
          title="2. Create your agreement"
          defaultOpen={isConnected && userAgreement == null}
          completed={isConnected && userAgreement != null}
        >
          {isConnected && userAgreement == null && (
            <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
          )}
        </AccordionItem>

        <AccordionItem
          title="3. Share with your partner"
          defaultOpen={
            userAgreement != null &&
            userAgreement.state == EAgreementState.Created &&
            userAgreement.alice === address
          }
          completed={false}
        >
          {userAgreement != null &&
            userAgreement.state == EAgreementState.Created &&
            userAgreement.alice === address && (
              <ShareWithPartnerBlock agreement={userAgreement} />
            )}
        </AccordionItem>
      </div>
    </MainLayout>
  )
}

export default WizardPage
