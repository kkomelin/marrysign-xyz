import { BigNumberish } from 'ethers'
import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import {
  agreementStateToLongString,
  formatContractDate,
} from '../../lib/contract/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
import Button from '../controls/Button'
import AgreementStateVisualization from '../misc/AgreementStateVisualization'
import ConfirmDialog from '../misc/ConfigmDialog'
import ShareBlock from './ShareBlock'

type Props = {
  agreement: MarrySign.AgreementStruct | null
  agreementContent: IAgreementContent | null
}
const AgreementInfoBlock: FC<Props> = (props) => {
  const { agreement, agreementContent } = props

  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false)

  const { address } = useAccount()

  if (!agreement || !agreementContent) {
    return <></>
  }

  let state = agreementStateToLongString(
    agreement.state as BigNumberish,
    agreementContent
  )

  const date = formatContractDate(agreement.updatedAt as BigNumberish)

  const shareButtonLabel =
    agreement &&
    agreement.alice === address &&
    agreement.state === EAgreementState.Created
      ? 'Invite your partner'
      : 'Spread the word'

  return (
    <div className="w-full max-w-2xl px-6 py-2 text-lg text-center md:py-4">
      {agreement.state === EAgreementState.Accepted && (
        <div className="py-3 text-gray-500">On {date}</div>
      )}
      <div className="py-3">
        <span className="text-5xl text-secondary font-cursive ">
          {agreementContent.partner2.name}
        </span>{' '}
        <span className="block p-4 text-2xl text-gray-500 md:inline">&</span>{' '}
        <span className="text-5xl text-secondary font-cursive ">
          {agreementContent.partner1.name}
        </span>
      </div>
      <div className="p-4 text-gray-500 text-md">
        {agreement.state === EAgreementState.Accepted
          ? 'vowed to each other'
          : 'are going to vow to each other'}
      </div>
      <div className="py-3 text-5xl leading-10 text-primary font-cursive">
        {agreementContent.vow}
      </div>

      <div className="flex flex-col items-center justify-start py-3 mt-5 mb-8">
        <AgreementStateVisualization
          state={agreement.state as EAgreementState}
          className="w-[180px]"
        />
        <div className="max-w-sm mt-2 text-gray-500 text-md">{state}</div>
      </div>

      {agreement && agreement.state !== EAgreementState.Refused && (
        <div className="flex flex-col items-center justify-center py-3 my-5">
          <Button onClick={() => setShareDialogOpen(true)} size="large">
            {shareButtonLabel}
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={shareDialogOpen}
        title={shareButtonLabel}
        description={<ShareBlock agreement={agreement} />}
        confirmButtonLabel="Terminate & pay the fees"
        onClose={() => setShareDialogOpen(false)}
      />
    </div>
  )
}

export default AgreementInfoBlock
