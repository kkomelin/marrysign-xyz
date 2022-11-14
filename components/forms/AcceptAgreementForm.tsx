import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { useAccount } from 'wagmi'
import { SERVICE_FEE_PERCENT } from '../../lib/config'
import { parseAgreementContent } from '../../lib/content'
import { acceptAgreement, refuseAgreement } from '../../lib/contract/agreement'
import { handleContractError } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import Button from '../controls/Button'
import { useAppContext } from '../hooks/useAppContext'

type Props = {
  agreement: MarrySign.AgreementStruct
  onAgreementAccepted: (agreementId: BytesLike) => void
  onAgreementRefused: (agreementId: BytesLike) => void
}
const AcceptAgreementForm: FC<Props> = (props) => {
  const { onAgreementAccepted, agreement, onAgreementRefused } = props
  const { address } = useAccount()
  const { showAppLoading, hideAppLoading } = useAppContext()

  const handleAcceptAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Accepting the agreement...')
      const successful = await acceptAgreement(
        agreement.id.toString(),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementAccepted(agreementId)
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

  const handleRefuseAgreement = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      showAppLoading('Refusing the agreement...')
      const successful = await refuseAgreement(
        agreement.id.toString(),
        (agreementId: BytesLike) => {
          hideAppLoading()
          return onAgreementRefused(agreementId)
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

  const agreementContent = parseAgreementContent(agreement.content as BytesLike)

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 mt-6 bg-white border rounded-lg">
      <form className="flex flex-col justify-center w-full max-w-sm py-5">
        {agreementContent && (
          <>
            <div className="mb-2 font-semibold text-red-600">
              By pressing Accept, you,{' '}
              {agreement.alice === address
                ? agreementContent.partner1.name
                : agreementContent.partner2.name}
              , promise the following to{' '}
              {agreement.alice === address
                ? agreementContent.partner2.name
                : agreementContent.partner1.name}
              :
            </div>
            <div>{agreementContent.vow}</div>

            {agreement && agreement.state === EAgreementState.Created && (
              <div className="py-3 my1-5">
                <div className="mb-2 font-semibold text-red-600">
                  Termination cost
                </div>

                <div>
                  <p>
                    No one wants to think about a divorce when getting married
                    but it's an important matter.
                  </p>

                  <p className="mt-2">
                    Your partner suggested{' '}
                    <b>${agreement.terminationCost.toString()} USD</b>{' '}
                    termination cost which will be paid by a terminating partner
                    to another partner in case of divorce . ${100 - SERVICE_FEE_PERCENT}% of it
                    will go to the opposite partner as a compensation, and $
                    {SERVICE_FEE_PERCENT}% will go to MarrySign as a service
                    fee.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col justify-between">
          <Button onClick={handleAcceptAgreement} className="w-full">
            Accept
          </Button>
          <Button
            color="secondary"
            onClick={handleRefuseAgreement}
            description="No termination cost charged"
            className="w-full"
          >
            Refuse
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AcceptAgreementForm
