import { BytesLike } from 'ethers'
import { FC } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { absoluteAgreementUrl } from '../../lib/helpers'

type Props = {
  id: BytesLike
}
const AgreementQRCode: FC<Props> = ({ id }) => {
  return (
    <QRCode
      value={absoluteAgreementUrl(id)}
      size={200}
      fgColor="#c084fc"
      logoImage="/images/states/accepted.svg"
      logoWidth={40}
      logoHeight={40}
      logoOpacity={0.6}
      removeQrCodeBehindLogo={true}
      eyeRadius={[5,5,5,5]}
      qrStyle = 'dots'
    />
  )
}

export default AgreementQRCode
