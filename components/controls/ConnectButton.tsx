import { ConnectButton as ConnectButtonRainbow } from '@rainbow-me/rainbowkit'
import { FC } from 'react'

type Props = {
  label?: string
}
const ConnectButton: FC<Props> = ({label = 'Login'}) => {
  return <ConnectButtonRainbow label={label} showBalance={false} />
}

export default ConnectButton
