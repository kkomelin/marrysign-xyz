import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'
import auth from '../../lib/auth/init'
import { APP_NAME, APP_URL } from '../../lib/config'
import CustomAvatar from '../misc/CustomAvatar'

type Props = {}
const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <WagmiConfig config={auth.wagmiConfig}>
      <RainbowKitProvider
        appInfo={{
          appName: APP_NAME,
          learnMoreUrl: APP_URL,
        }}
        chains={auth.chains}
        theme={lightTheme({
          accentColor: 'var(--ms-color-primary)', // primary color, see _variables.css.
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        avatar={CustomAvatar}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AuthProvider
