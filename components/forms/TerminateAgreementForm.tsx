import { BigNumberish, BytesLike } from 'ethers'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SERVICE_FEE_PERCENT } from '../../lib/config'
import { handleContractError } from '../../lib/helpers'
import { terminateAgreement } from '../../lib/services/agreement'
import { convertUSDToETH } from '../../lib/services/chainlink'
import { MarrySign } from '../../typechain'
import { ECustomContractError } from '../../types/ECustomContractError'
import { ICustomContractError } from '../../types/ICustomContractError'
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
  const [valueInETH, setValueInETH] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

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
      if (!successful) {
        hideAppLoading()
        handleContractError('Transaction failed for some reason.')
      }
    } catch (e: ICustomContractError) {
      hideAppLoading()

      if (
        (e?.code === 'UNPREDICTABLE_GAS_LIMIT' &&
          e?.message &&
          e.message.indexOf(ECustomContractError.WrongAmount) !== 0) ||
        e?.errorCode === ECustomContractError.WrongAmount
      ) {
        console.log(e)

        toast.warn(
          'The USD/ETH exchange rate has changed significantly. Could you please try one more time?'
        )
        return
      }

      handleContractError(e)
    }
  }

  const updateETH = async (value: number | undefined) => {
    // Don't send one more request if we're waiting for a response already.
    if (loading) {
      return
    }

    setLoading(true)
    if (value === undefined || value == null || value === 0) {
      setValueInETH(0)
      setLoading(false)
      return
    }

    const amountInETH = await convertUSDToETH(value)
    setValueInETH(amountInETH)
    setLoading(false)
  }

  useEffect(() => {
    if (agreement) {
      updateETH(Number(agreement.terminationCost))
    }
  }, [agreement])

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mt-6 bg-white border rounded-lg">
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
        title="You can terminate your agreement (divorce) but..."
        description={
          <div>
            You will be charged the equivalent of{' '}
            <b>${agreement.terminationCost.toString()} USD</b>{' '}
            {valueInETH ? <b>(currently {valueInETH} ETH)</b> : ''}. Most of it
            will be transferred to your ex, except our{' '}
            <b>{SERVICE_FEE_PERCENT}%</b> service fee.
          </div>
        }
        confirmButtonLabel="Terminate & pay fees"
        onConfirm={handleTerminateAgreement}
        onClose={closeConfirmDialog}
        onCancel={closeConfirmDialog}
      />
    </div>
  )
}

export default TerminateAgreementForm
