import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { useAccount } from 'wagmi'
import { parseAgreementContent } from '../lib/content'
import { acceptAgreement, refuseAgreement } from '../lib/contract/agreement'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import Button from './controls/Button'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementAccepted: () => void
  onAgreementRefused: () => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted, agreement, onAgreementRefused } = props
  const { address } = useAccount()

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const successful = await acceptAgreement(agreement.id.toString())
      if (successful) {
        onAgreementAccepted()
      }
    } catch (e) {
      handleContractError(e)
    }
  }

  const handleRefuseAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const successful = await refuseAgreement(agreement.id.toString())
      if (successful) {
        onAgreementRefused()
      }
    } catch (e) {
      handleContractError(e)
    }
  }

  const agreementContent = parseAgreementContent(agreement.content as BytesLike)

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        {agreementContent && (
          <>
            <div>
              By pressing Accept, you{' '}
              {agreement.alice === address
                ? agreementContent.partner1.name
                : agreementContent.partner2.name}{' '}
              promise the following to
              {agreement.alice === address
                ? agreementContent.partner2.name
                : agreementContent.partner1.name}{' '}
              :
            </div>
            <div>{agreementContent.vow}</div>
          </>
        )}

        <div className="flex flex-col justify-between">
          <Button onClick={handleAcceptAgreement}>Accept</Button>
          <Button color="secondary" onClick={handleRefuseAgreement}>
            Refuse
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AcceptAgreementForm
