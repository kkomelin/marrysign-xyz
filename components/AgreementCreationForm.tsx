import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { createAgreement } from '../lib/contract/agreement'
import Button from './Button'
import TextArea from './TextArea'
import TextField from './TextField'

type Props = {
  onAgreementCreated: (agreementId: number) => void
}
const AgreementCreationForm: FC<Props> = (props) => {
  const { onAgreementCreated } = props
  // const { isConnected } = useAccount()
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState<boolean>(true)
  const [partner1Name, setPartner1Name] = useState<string>('Alice Smith')
  const [partner2Name, setPartner2Name] = useState<string>('Bob Johnson')
  const [partner2Address, setPartner2Address] = useState<string>(
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
  )
  const [vow, setVow] = useState<string>(
    `I take you to be my spouse, to have and to hold from this day forward, for better, for worse, for richer, for poorer, in sickness and in health, to love and to cherish, until parted by death. This is my solemn vow.`
  )

  const handleAgreementCreation = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await createAgreement(
        partner1Name,
        partner2Name,
        partner2Address,
        vow,
        10,
        (agreementId: number) => {
          onAgreementCreated(agreementId)
          setIsAddButtonEnabled(true)
        }
      )
    } catch (e) {
      toast.error('An error has occurred. Please contact support.')
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextField
          value={partner1Name}
          placeholder="Your name"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner1Name(e.target.value)
          }
        />
        <TextField
          value={partner2Name}
          placeholder="Name of your partner"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Name(e.target.value)
          }
        />
        <TextField
          value={partner2Address}
          placeholder="0xf3…2266"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Address(e.target.value)
          }
        />
        <TextArea
          value={vow}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setVow(e.target.value)
          }
        />
        <Button onClick={handleAgreementCreation}>Create agreement</Button>
      </form>
    </div>
  )
}

export default AgreementCreationForm
