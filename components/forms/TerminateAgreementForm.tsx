import { BigNumberish, BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { terminateAgreement } from '../../lib/contract/agreement'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementTerminated: (agreementId: BytesLike) => void
}
const TerminateAgreementForm: FC<Props> = (props) => {
  const { onAgreementTerminated, agreement } = props
  const { showAppLoading, hideAppLoading } = useAppContext()

  const handleTerminateAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Terminating the agreement...')
      const successful = await terminateAgreement(
        agreement.id.toString(),
        agreement.terminationCost as BigNumberish,
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementTerminated(agreementId)
        }
      )
      // if (successful) {
      //   // onAgreementTerminated()
      // }
    } catch (e) {
      hideAppLoading()
      handleContractError(e)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 rounded-sm border1">
      <form className="flex flex-col justify-center w-full max-w-sm">
        <div className="flex flex-col justify-between">
          <button
            className="text-primary hover:underline"
            onClick={handleTerminateAgreement}
          >
            What if I changed my mind?
          </button>
          {/* <Button color="secondary" onClick={handleTerminateAgreement}>
            Terminate
          </Button> */}
        </div>
      </form>
    </div>
  )
}

export default TerminateAgreementForm
