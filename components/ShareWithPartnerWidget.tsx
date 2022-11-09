import { BytesLike } from 'ethers'
import { FC } from 'react'
import { agreementPath } from '../lib/helpers'
import { MarrySign } from '../typechain'
import ButtonLink from './controls/ButtonLink'
import CopyToClipboardButton from './controls/CopyToClipboardButton'
import AgreementQRCode from './misc/AgreementQRCode'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const ShareWithPartnerWidget: FC<Props> = (props) => {
  const { agreement } = props

  if (!agreement) {
    return <></>
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 my-6 border rounded-sm">
      <div className="py-2 text-center">
        Your agreement is created.
        <br />
        Next step is to share it with your loved one!
      </div>
      
      <AgreementQRCode id={agreement.id as BytesLike} />
      
      <div className="flex flex-col items-center justify-center">
        <CopyToClipboardButton agreementId={agreement.id as BytesLike} />
      </div>

      <ButtonLink href={agreementPath(agreement.id as BytesLike)}>
        Done
      </ButtonLink>
    </div>
  )
}

export default ShareWithPartnerWidget
