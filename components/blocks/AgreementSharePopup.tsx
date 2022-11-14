import { FC, useState } from 'react'
import { useAccount } from 'wagmi'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import Button from '../controls/Button'
import ConfirmDialog from '../misc/ConfigmDialog'
import AgreementShareBlock from './AgreementShareBlock'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const AgreementSharePopup: FC<Props> = (props) => {
  const { agreement } = props

  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false)

  const { address } = useAccount()

  if (!agreement) {
    return <></>
  }

  const shareButtonLabel =
    agreement &&
    agreement.alice === address &&
    agreement.state === EAgreementState.Created
      ? 'Invite your partner'
      : 'Spread the word'

  return (
    <div className="w-full max-w-2xl px-6 py-2 text-lg text-center md:py-4">
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
        description={<AgreementShareBlock agreement={agreement} />}
        onClose={() => setShareDialogOpen(false)}
      />
    </div>
  )
}

export default AgreementSharePopup
