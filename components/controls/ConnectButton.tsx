import { ConnectButton as ConnectButtonRainbow } from '@rainbow-me/rainbowkit'
import { FC } from 'react'
import { LOGIN_ENABLED, SUBSCRIBE_TO_NEWS_PATH } from '../../lib/config'
import ButtonLink from './ButtonLink'

type Props = {
  label?: string
}
const ConnectButton: FC<Props> = ({ label = 'Login' }) => {
  if (!LOGIN_ENABLED) {
    return (
      <ButtonLink
        href={SUBSCRIBE_TO_NEWS_PATH}
        target="_blank"
        className="mt-0 max-w-min"
      >
        {label}
      </ButtonLink>
    )
  }

  return <ConnectButtonRainbow label={label} showBalance={false} />
}

export default ConnectButton
