import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers'
import { FC, MouseEvent, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { APP_NAME, SERVICE_FEE_ETH } from '../../lib/config'
import { SERVICE_FEE_DESCRIPTION } from '../../lib/config/strings'
import { parseAgreementContent } from '../../lib/content'
import { handleContractError } from '../../lib/helpers'
import { acceptAgreement, refuseAgreement } from '../../lib/services/agreement'
import { convertETHToUSD } from '../../lib/services/chainlink'
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
  const [valueInUSD, setValueInUSD] = useState<string | undefined>(undefined)

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

  useEffect(() => {
    if (agreement != null) {
      convertETHToUSD(
        ethers.utils.formatEther(agreement.terminationCost as BigNumber)
      ).then((amountInUSD: string) => {
        if (amountInUSD) {
          setValueInUSD(amountInUSD)
        }
      })
    }
  }, [agreement])

  return (
    <div className="flex flex-col items-center justify-center w-full p-5 mt-6 bg-white border rounded-lg">
      <form className="flex flex-col justify-center w-full max-w-sm py-5">
        {agreementContent && (
          <>
            {agreement && agreement.state === EAgreementState.Created && (
              <div className="py-3 my1-5">
                <div className="mb-2 font-semibold text-red-600">
                  By pressing Accept, you,{' '}
                  {agreement.alice === address
                    ? agreementContent.partner1.name
                    : agreementContent.partner2.name}{' '}
                  accept the above mentioned and agree with the termination
                  cost:
                </div>

                <div>
                  <p className="mt-2">
                    Your partner suggested{' '}
                    <b>
                      {ethers.utils.formatEther(
                        agreement.terminationCost as BigNumberish
                      )}{' '}
                      ETH
                    </b>{' '}
                    {valueInUSD && `(currently ${valueInUSD} USD)`} as a
                    termination cost which a terminating partner would be
                    required to pay to another in the event of termination.{' '}
                    {APP_NAME} does't charge a service fee for termination,
                    except the Ethereum-blockchain network fee which is variable
                    and depends on the network load.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col justify-between">
          <Button
            onClick={handleAcceptAgreement}
            className="w-full"
            description={
              !ethers.utils.parseEther(SERVICE_FEE_ETH).eq(0)
                ? SERVICE_FEE_DESCRIPTION
                : undefined
            }
          >
            Accept
          </Button>
          <Button
            color="secondary"
            onClick={handleRefuseAgreement}
            description="No agreement termination cost involved"
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
