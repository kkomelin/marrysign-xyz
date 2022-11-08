import { ConnectButton } from '@rainbow-me/rainbowkit'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import CreateAgreementForm from '../../components/CreateAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'
import AgreementQRCode from '../../components/misc/AgreementQRCode'
import { absoluteAgreementUrl } from '../../lib/helpers'

const CreateAgreementPage: NextPage = () => {
  const { isDisconnected } = useAccount()
  const [agreementId, setAgreementId] = useState<BytesLike>()
  const router = useRouter()

  const handleAgreementCreated = (agreementId: BytesLike) => {
    setAgreementId(agreementId)
    toast(
      'Congrats! Your agreement has been created.'
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        {agreementId == null && (
          <CreateAgreementForm onAgreementCreated={handleAgreementCreated} />
        )}

        {agreementId != null && (
          <div>
            <div>
              Now when your agreement has been created, time to share it with
              your loved one!
            </div>
            <AgreementQRCode id={agreementId} />
            <Link className="block" href={`/agreement/${agreementId}`}>
              {agreementId.toString()}
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default CreateAgreementPage
