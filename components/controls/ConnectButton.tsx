import { ConnectButton as ConnectButtonRainbow } from '@rainbow-me/rainbowkit'
import { FC } from 'react'

const ConnectButton: FC = () => {
  return <ConnectButtonRainbow label="Sign in" showBalance={false} />
}

export default ConnectButton
