import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { parseAgreementContent } from '../lib/content'
import { acceptAgreement, refuseAgreement } from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import { MarrySign } from '../typechain'
import Button from './controls/Button'
import TextArea from './controls/TextArea'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementAccepted: () => void
  onAgreementRefused: () => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted, agreement, onAgreementRefused } = props

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const successful = await acceptAgreement(agreement.id.toString())
      if (successful) {
        onAgreementAccepted()
      }
    } catch (e) {
      handleException(e)
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
      handleException(e)
    }
  }

  const agreementContent = parseAgreementContent(agreement.content as BytesLike)

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextArea readOnly={true} value={agreementContent.vow} />
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
