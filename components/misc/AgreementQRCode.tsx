import { BytesLike } from 'ethers'
import { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { absoluteAgreementUrl } from '../../lib/helpers'

type Props = {
  id: BytesLike
}
const AgreementQRCode: FC<Props> = ({ id }) => {
  return <QRCode value={absoluteAgreementUrl(id)} />
}

export default AgreementQRCode
