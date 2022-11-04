import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AcceptAgreementForm from '../../components/AcceptAgreementForm'
import MainLayout from '../../components/layouts/MainLayout'
import { getAgreementById } from '../../lib/contract/agreement'
import { handleException } from '../../lib/helpers'
import { MarrySign } from '../../typechain'

const AgreementPage: NextPage = (props) => {
  const [agreementId, setAgreementId] = useState<string>()
  const { isDisconnected } = useAccount()
  const [userAgreement, setUserAgreement] =
    useState<MarrySign.AgreementStruct>()
  const router = useRouter()

  const loadAgreement = async (id: string) => {
    try {
      const agreement = await getAgreementById(id)
      setUserAgreement(agreement)
      console.log(agreement)
    } catch (e) {
      handleException(e)
    }
  }

  const handleAgreementAccepted = () => {
    toast('Congrats! Your marriage is registered! Time to celebrate!')
  }
  const handleAgreementRefused = () => {
    toast(
      'Congrats! You have successfullty refused the agreement your loved one created for you. If it helps, now you may create your own better version.'
    )
  }

  useEffect(() => {
    if (isDisconnected) {
      return
    }
    if (router.query.id == null) {
      return
    }

    loadAgreement(router.query.id.toString())
  }, [])

  // @todo: Make sure the agreement found by address.
  // if (agreementId == null) {
  //   return <></>
  // }

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center">
        {isDisconnected && (
          <ConnectButton label="Sign in" showBalance={false} />
        )}

        {userAgreement && (
          <AcceptAgreementForm
            agreement={userAgreement}
            onAgreementAccepted={handleAgreementAccepted}
            onAgreementRefused={handleAgreementRefused}
          />
        )}
      </div>
    </MainLayout>
  )
}

export default AgreementPage
