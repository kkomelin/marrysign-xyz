import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import Button from './controls/Button'
import TextArea from './controls/TextArea'

type Props = {
  onAgreementAccepted: (agreementId: number) => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted } = props
  // const { isConnected } = useAccount()
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState<boolean>(true)
  const [vow, setVow] = useState<string>('')

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // try {
    //   await createAgreement(
    //     partner1Name,
    //     partner2Name,
    //     partner2Address,
    //     vow,
    //     10,
    //     (agreementId: number) => {
    //       onAgreementAccepted(agreementId)
    //       setIsAddButtonEnabled(true)
    //     }
    //   )
    // } catch (e) {
    //   handleException(e)
    // }
  }

  const handleRefuseAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // try {
    //   await createAgreement(
    //     partner1Name,
    //     partner2Name,
    //     partner2Address,
    //     vow,
    //     10,
    //     (agreementId: number) => {
    //       onAgreementAccepted(agreementId)
    //       setIsAddButtonEnabled(true)
    //     }
    //   )
    // } catch (e) {
    //   handleException(e)
    // }
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
        <div className='flex flex-col justify-between'>
          <Button onClick={handleAcceptAgreement}>Accept</Button>
          <Button color='secondary' onClick={handleAcceptAgreement}>Refuse</Button>
        </div>
      </form>
    </div>
  )
}

export default AcceptAgreementForm
