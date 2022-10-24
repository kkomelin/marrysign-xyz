import { lightTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { FC, PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'
import auth from '../../../lib/auth/init'

type Props = {
  [key: string]: any
}
const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <WagmiConfig client={auth.wagmiClient}>
      <RainbowKitProvider
        coolMode
        chains={auth.chains}
        theme={lightTheme({
          accentColor: '#c084fc',
          accentColorForeground: 'white',
          borderRadius: 'medium',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AuthProvider
