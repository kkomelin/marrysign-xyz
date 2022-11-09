import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { AppContext } from '../components/context/AppContext'
import CreateAgreementForm from '../components/CreateAgreementForm'
import MainLayout from '../components/layouts/MainLayout'
import AgreementQRCode from '../components/misc/AgreementQRCode'
import { absoluteAgreementUrl } from '../lib/helpers'
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

    // router.push(`/${agreementId.toString()}`)
  }

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">3 easy steps:</h2>

        <div>
          <h3 className="font-bold">
            {isConnected && <>(done)</>} 1. Connect with your wallet
          </h3>
          {isDisconnected && (
            <ConnectButton label="Sign in" showBalance={false} />
          )}
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
            {isConnected && <>(done)</>} 3. Connect with your wallet
          </h3>
          {userAgreement &&
            userAgreement.state == EAgreementState.Created &&
            userAgreement.alice === address && (
              <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 my-6 border rounded-sm">
                <div className="py-2 text-center">
                  Your agreement is created,
                  <br />
                  next step is to share it with your loved one!
                </div>
                <AgreementQRCode id={userAgreement.id as BytesLike} />
                <Link
                  className="block break-all"
                  href={`/${userAgreement.id.toString()}`}
                >
                  {absoluteAgreementUrl(userAgreement.id.toString())}
                </Link>
              </div>
            )}
        </div>
      </div>
    </MainLayout>
  )
}

export default WizardPage
