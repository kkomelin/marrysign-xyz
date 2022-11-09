import { BytesLike } from 'ethers'
import { FC, MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { absoluteAgreementUrl } from '../../lib/helpers'
import Button from './Button'

type Props = {
  agreementId: BytesLike
}
const CopyToClipboardButton: FC<Props> = ({ agreementId }) => {
  return (
    <Button
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        navigator.clipboard.writeText(
          absoluteAgreementUrl(agreementId as BytesLike)
        )
        toast('Copied to clipboard')
      }}
    >
      Copy link
    </Button>
  )
}

export default CopyToClipboardButton
