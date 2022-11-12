import { BytesLike } from 'ethers'
import { FC } from 'react'
import { MarrySign } from '../../typechain'
import CopyToClipboardButton from '../controls/CopyToClipboardButton'
import AgreementQRCode from '../misc/AgreementQRCode'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const ShareBlock: FC<Props> = (props) => {
  const { agreement } = props

  if (!agreement) {
    return <></>
  }

  return (
    <div className="w-full max-w-xs p-6 m-6">
      {/* <div className="py-1 break-all">
            ID: <br /> {agreement.id.toString()}
          </div> */}
      <div className="flex flex-col items-center justify-center">
        <AgreementQRCode id={agreement.id as BytesLike} />
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <CopyToClipboardButton
          className="w-full"
          agreementId={agreement.id as BytesLike}
        />
        {/* <ShareButton agreement={agreement} /> */}
      </div>
    </div>
  )
}

export default ShareBlock
