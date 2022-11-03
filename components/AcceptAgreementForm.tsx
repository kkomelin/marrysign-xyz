import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { acceptAgreement, refuseAgreement } from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import Button from './controls/Button'
import TextArea from './controls/TextArea'

type Props = {
  agreementId: string
  onAgreementAccepted: () => void
  onAgreementRefused: () => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted, agreementId, onAgreementRefused } = props
  const [vow, setVow] = useState<string>('')

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const successful = await acceptAgreement(agreementId)

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
      const successful = await refuseAgreement(agreementId)

      if (successful) {
        onAgreementRefused()
      }
    } catch (e) {
      handleException(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextArea
          readOnly={true}
          value={vow}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setVow(e.target.value)
          }
        />
        <div className="flex flex-col justify-between">
          <Button onClick={handleAcceptAgreement}>Accept</Button>
          <Button color="secondary" onClick={handleAcceptAgreement}>
            Refuse
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AcceptAgreementForm
