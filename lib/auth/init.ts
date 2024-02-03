import { Chain, connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createConfig } from 'wagmi'
import { goerli, hardhat, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME } from '../config'
import { isProd, isStagingProd } from '../helpers'

let networks: Chain[] = [
  // localhost,
  hardhat,
]
if (isProd()) {
  if (isStagingProd()) {
    networks = [goerli]
  } else {
    networks = [mainnet]
  }
}

const { chains, publicClient } = configureChains(networks, [publicProvider()])

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ''

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({
        chains,
        shimDisconnect: true,
      }),
      metaMaskWallet({
        chains,
        projectId,
      }),
      walletConnectWallet({
        chains,
        projectId,
      }),
      coinbaseWallet({
        chains,
        appName: APP_NAME,
      }),
      trustWallet({ chains, projectId }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient,
})

export default {
  chains,
  wagmiConfig,
}
