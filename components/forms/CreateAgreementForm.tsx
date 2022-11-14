import { BytesLike } from 'ethers'
import { ChangeEvent, FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import { SERVICE_FEE_PERCENT } from '../../lib/config'
import { DEFAULT_VOW } from '../../lib/config/strings'
import { handleContractError, validateCurrency } from '../../lib/helpers'
import { createAgreement } from '../../lib/services/agreement'
import { convertUSDToETH } from '../../lib/services/chainlink'
import Button from '../controls/Button'
import TextArea from '../controls/TextArea'
import TextField from '../controls/TextField'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  onAgreementCreated: (agreementId: BytesLike) => void
}
const CreateAgreementForm: FC<Props> = (props) => {
  const { onAgreementCreated } = props
  const { address } = useAccount()
  const [partner1Name, setPartner1Name] = useState<string>('Alice Smith')
  const [partner2Name, setPartner2Name] = useState<string>('Bob Johnson')
  const [terminationCost, setTerminationCost] = useState<number>(10)
  const [terminationCostInETH, setTerminationCostInETH] = useState<number>(0)
  const [partner2Address, setPartner2Address] = useState<string>(
    '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199'
  )
  const [vow, setVow] = useState<string>(DEFAULT_VOW)
  const { showAppLoading, hideAppLoading } = useAppContext()

  const handleCreateAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (
      partner1Name.length === 0 ||
      partner2Name.length === 0 ||
      partner2Address.length === 0 ||
      vow.length === 0 ||
      terminationCost === 0
    ) {
      toast.warn('Please make sure you fill in all required fields.')
      return
    }

    if (partner2Address === address) {
      toast.warn(
        "It seems like you accidentally entered your own Ethereum address. Please enter your partner's address instead."
      )
      setPartner2Address('')
      return
    }

    if (!validateCurrency(terminationCost.toString().trim())) {
      toast.warn(
        'Please check the termination cost value. It should be in the US Dollars, e.g. 100.50'
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
        terminationCost,
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

  const requestAmountInETH = async () => {
    if (terminationCost === 0) {
      return 0
    }
    const amountInETH = await convertUSDToETH(terminationCost)
    setTerminationCostInETH(amountInETH)
  }

  // @todo: Improve the form validation by using Formik + Yup.

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 bg-white border rounded-lg">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <TextField
          label="Your full name"
          value={partner1Name}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner1Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's full name"
          value={partner2Name}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPartner2Name(e.target.value)
          }
        />
        <TextField
          label="Your partner's ETH address (e.g. 0xf3...2266)"
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
        <TextField
          label="Termination cost (USD)"
          description={
            (terminationCostInETH ? `${terminationCostInETH} ETH apx. ` : '') +
            `A terminating partner pays the equivalent of this amount in Ether (ETH). ${
              100 - SERVICE_FEE_PERCENT
            }% of it goes to the opposite partner as a compensation, and ${SERVICE_FEE_PERCENT}% goes to MarrySign as a service fee.`
          }
          type="number"
          value={terminationCost}
          required={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTerminationCost(Number(e.target.value))
          }
          onBlur={async () => {
            await requestAmountInETH()
          }}
        />
        {/* Validate the termination cost number */}
        <Button onClick={handleCreateAgreement}>Create agreement</Button>
      </form>
    </div>
  )
}

export default CreateAgreementForm
