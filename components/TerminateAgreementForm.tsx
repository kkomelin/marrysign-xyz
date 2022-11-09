import { BigNumberish, BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { terminateAgreement } from '../lib/contract/agreement'
import { handleContractError } from '../lib/helpers'
import { MarrySign } from '../typechain'
import Button from './controls/Button'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementTerminated: (agreementId: BytesLike) => void
}
const TerminateAgreementForm: FC<Props> = (props) => {
  const { onAgreementTerminated, agreement } = props

  const handleTerminateAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const successful = await terminateAgreement(
        agreement.id.toString(),
        agreement.terminationCost as BigNumberish,
        onAgreementTerminated
      )
      if (successful) {
        // onAgreementTerminated()
      }
    } catch (e) {
      handleContractError(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 border rounded-sm">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <div className="flex flex-col justify-between">
          <Button color="secondary" onClick={handleTerminateAgreement}>
            Terminate
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TerminateAgreementForm
