import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient } from 'wagmi'
import { hardhat, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME } from '../config'
import { isProd } from '../helpers'

let networks = [
  // goerli,
  hardhat /* localhost */,
]
if (isProd()) {
  networks = [/*goerli */ mainnet]
}

const { chains, provider } = configureChains(networks, [publicProvider()])

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({
        chains,
        shimDisconnect: true,
      }),
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
      coinbaseWallet({
        chains,
        appName: APP_NAME,
      }),
      trustWallet({ chains }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
})

export default {
  chains,
  wagmiClient,
}
