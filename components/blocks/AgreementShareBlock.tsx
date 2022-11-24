import { BytesLike } from 'ethers'
import { FC } from 'react'
import { MarrySign } from '../../typechain'
import CopyToClipboardButton from '../controls/CopyToClipboardButton'
import AgreementQRCode from '../misc/AgreementQRCode'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const AgreementShareBlock: FC<Props> = (props) => {
  const { agreement } = props

  if (!agreement) {
    return <></>
  }

  return (
    <div className="w-full max-w-xs p-2 my-3">
      <div className="flex flex-col items-center justify-center">
        <AgreementQRCode id={agreement.id as BytesLike} />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <CopyToClipboardButton
          className="w-full"
          agreementId={agreement.id as BytesLike}
        />
      </div>
    </div>
  )
}

export default AgreementShareBlock
