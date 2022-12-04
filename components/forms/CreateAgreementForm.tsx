import { BigNumber, BytesLike, ethers } from 'ethers'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import {
  SERVICE_FEE_PERCENT,
  SUGGESTED_TERMINATION_COST_ETH,
} from '../../lib/config'
import { DEFAULT_VOW } from '../../lib/config/strings'
import { handleContractError, validateCurrency } from '../../lib/helpers'
import { createAgreement } from '../../lib/services/agreement'
import Button from '../controls/Button'
import CurrencyField from '../controls/CurrencyField'
import TextArea from '../controls/TextArea'
import TextField from '../controls/TextField'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  onAgreementCreated: (agreementId: BytesLike) => void
}
const CreateAgreementForm: FC<Props> = (props) => {
  const { onAgreementCreated } = props
  const { address } = useAccount()
  const [partner1Name, setPartner1Name] = useState<string>('') // Alice Smith
  const [partner2Name, setPartner2Name] = useState<string>('') // Bob Johnson
  const [terminationCost, setTerminationCost] = useState<string>(
    SUGGESTED_TERMINATION_COST_ETH
  )
  const [partner2Address, setPartner2Address] = useState<string>('') // 0x098F4f427732984e6f205AFe66e1f9015B5A45c7
  const [vow, setVow] = useState<string>(DEFAULT_VOW)
  const { showAppLoading, hideAppLoading } = useAppContext()

  const handleCreateAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (ethers.utils.parseEther(terminationCost) === BigNumber.from(0)) {
      toast.warn('The termination cost should be greater than 0.')
      return
    }

    if (
      partner1Name.length === 0 ||
      partner2Name.length === 0 ||
      partner2Address.length === 0 ||
      vow.length === 0
    ) {
      toast.warn('Please make sure you filled in all required fields.')
      return
    }

    if (partner2Address === address) {
      toast.warn(
        "It seems like you accidentally entered your own Ethereum address. Please enter your partner's address instead."
      )
      setPartner2Address('')
      return
    }

    if (!validateCurrency(terminationCost.trim())) {
      toast.warn(
        'Please check the termination cost value. It should be in Ethers, e.g. ' +
          SUGGESTED_TERMINATION_COST_ETH
      )
      return
    }

    try {
      showAppLoading('Creating your agreement...')
      const successful = await createAgreement(
        partner1Name,
        partner2Name,
        partner2Address,
        vow,
        ethers.utils.parseEther(terminationCost),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementCreated(agreementId)
        }
      )
      if (!successful) {
        hideAppLoading()
        handleContractError('Transaction failed for some reason.')
      }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  // @todo: Improve the form validation by using Formik + Yup.

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 bg-white border rounded-lg">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextField
          label="Your name"
          value={partner1Name}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner1Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's name"
          value={partner2Name}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's ETH address"
          placeholder="0xf3...2266"
          value={partner2Address}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Address(e.target.value)
          }
        />
        <TextArea
          label="Your marital vow"
          value={vow}
          required={true}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setVow(e.target.value)
          }
        />
        <CurrencyField
          label="Termination cost"
          description={`A terminating partner pays this amount in ETH in the event of termination. ${
            100 - SERVICE_FEE_PERCENT
          }% of it goes to the opposite partner as a compensation, and ${SERVICE_FEE_PERCENT}% goes to MarrySign as a service fee.`}
          defaultETHValue={terminationCost}
          required={true}
          onChange={(value: string) => {
            setTerminationCost(value)
          }}
        />
        {/* Validate the termination cost number */}
        <Button onClick={handleCreateAgreement}>Create agreement</Button>
      </form>
    </div>
  )
}

export default CreateAgreementForm
