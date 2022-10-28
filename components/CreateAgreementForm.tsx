import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { DEFAULT_VOW } from '../lib/config/strings'
import { createAgreement } from '../lib/contract/agreement'
import { handleException } from '../lib/helpers'
import Button from './Button'
import TextArea from './TextArea'
import TextField from './TextField'

type Props = {
  onAgreementCreated: (agreementId: number) => void
}
const CreateAgreementForm: FC<Props> = (props) => {
  const { onAgreementCreated } = props
  // const { isConnected } = useAccount()
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState<boolean>(true)
  const [partner1Name, setPartner1Name] = useState<string>('Alice Smith')
  const [partner2Name, setPartner2Name] = useState<string>('Bob Johnson')
  const [partner2Address, setPartner2Address] = useState<string>(
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
  )
  const [vow, setVow] = useState<string>(DEFAULT_VOW)

  const handleCreateAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
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
      handleException(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full mt-6">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextField
          label="Your full name"
          value={partner1Name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner1Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's full name"
          value={partner2Name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's ETH address (e.g. 0xf3...2266)"
          value={partner2Address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Address(e.target.value)
          }
        />
        <TextArea
          label="Your marital vow"
          value={vow}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setVow(e.target.value)
          }
        />
        <Button onClick={handleCreateAgreement}>Create agreement</Button>
      </form>
    </div>
  )
}

export default CreateAgreementForm
