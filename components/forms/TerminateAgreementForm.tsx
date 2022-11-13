import { BigNumberish, BytesLike } from 'ethers'
import { FC, MouseEvent, useState } from 'react'
import { SERVICE_FEE_PERCENT } from '../../lib/config'
import { terminateAgreement } from '../../lib/contract/agreement'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { useAppContext } from '../hooks/useAppContext'
import ConfirmDialog from '../misc/ConfigmDialog'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementTerminated: (agreementId: BytesLike) => void
}
const TerminateAgreementForm: FC<Props> = (props) => {
  const { onAgreementTerminated, agreement } = props
  const { showAppLoading, hideAppLoading } = useAppContext()

  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false)

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true)
  }

  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false)
  }

  const handleTerminateAgreement = async () => {
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
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              openConfirmDialog()
            }}
          >
            What if I changed my mind?
          </button>
          {/* <Button color="secondary" onClick={handleTerminateAgreement}>
            Terminate
          </Button> */}
        </div>
      </form>
      <ConfirmDialog
        open={confirmDialogOpen}
        title="You can terminate your agreement but..."
        description={
          ` You will be charged the equivalent of $${agreement.terminationCost} USD in Ether.` +
          ` Most of it will be transferred to your ex, except for our ${SERVICE_FEE_PERCENT}% service fee.`
        }
        confirmButtonLabel="Terminate & pay the fees"
        onConfirm={handleTerminateAgreement}
        onClose={closeConfirmDialog}
      />
    </div>
  )
}

export default TerminateAgreementForm
