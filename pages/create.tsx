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
      <div className="flex flex-col">
        <h2 className="mt-10 mb-4 text-2xl font-bold">
          Create your agreement in 3 simple steps
        </h2>

        <AccordionItem
          title={`1. Connect with your wallet ${isConnected ? '(done)' : ''}`}
          open={!isConnected}
        >
          {isDisconnected && <ConnectButton />}
        </AccordionItem>

        <AccordionItem
          title={`2. Create your agreement ${
            isConnected && userAgreement ? '(done)' : ''
          }`}
          open={!Boolean(isConnected && userAgreement)}
        >
          {isConnected && userAgreement == null && (
            <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
          )}
        </AccordionItem>

        <AccordionItem
          title="3. Share with your partner"
          open={
            !Boolean(
              userAgreement &&
                userAgreement.state == EAgreementState.Created &&
                userAgreement.alice === address
            )
          }
        >
          {userAgreement &&
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
