import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { useAccount } from 'wagmi'
import { parseAgreementContent } from '../../lib/content'
import { acceptAgreement, refuseAgreement } from '../../lib/contract/agreement'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import Button from '../controls/Button'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementAccepted: (agreementId: BytesLike) => void
  onAgreementRefused: (agreementId: BytesLike) => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted, agreement, onAgreementRefused } = props
  const { address } = useAccount()
  const { showAppLoading, hideAppLoading } = useAppContext()

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Accepting the agreement...')
      const successful = await acceptAgreement(
        agreement.id.toString(),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementAccepted(agreementId)
        }
      )
      // if (successful) {
      //   // onAgreementAccepted()
      // }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  const handleRefuseAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Refusing the agreement...')
      const successful = await refuseAgreement(
        agreement.id.toString(),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementRefused(agreementId)
        }
      )
      // if (successful) {
      //   // onAgreementRefused()
      // }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  const agreementContent = parseAgreementContent(agreement.content as BytesLike)

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 border rounded-sm">
      <form className="flex flex-col justify-center w-full max-w-sm">
        {agreementContent && (
          <>
            <div className="text-red-600">
              By pressing Accept, you,{' '}
              {agreement.alice === address
                ? agreementContent.partner1.name
                : agreementContent.partner2.name}
              , promise the following to{' '}
              {agreement.alice === address
                ? agreementContent.partner2.name
                : agreementContent.partner1.name}
              :
            </div>
            <div>{agreementContent.vow}</div>
          </>
        )}

        <div className="flex flex-col justify-between">
          <Button onClick={handleAcceptAgreement}>Accept</Button>
          <Button
            color="secondary"
            onClick={handleRefuseAgreement}
            description="No termination cost required"
          >
            Refuse
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AcceptAgreementForm
