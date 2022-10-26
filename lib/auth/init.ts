import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { chain, configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME } from '../config'
import { isProd } from '../helpers'

let networkds = [chain.mainnet]

if (!isProd()) {
  networkds = [chain.goerli, chain.hardhat, chain.localhost]
}

const { chains, provider } = configureChains(networkds, [publicProvider()])

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({
        chains,
        appName: APP_NAME,
      }),
      trustWallet({ chains }),
      walletConnectWallet({ chains }),
      injectedWallet({
        chains,
        shimDisconnect: true,
      }),
    ],
  },
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default {
  chains,
  wagmiClient,
}
