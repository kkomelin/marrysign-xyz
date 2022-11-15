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

let networkds = [chain.goerli, chain.hardhat /* chain.localhost */]
if (isProd()) {
  networkds = [chain.goerli, chain.mainnet]
}

const { chains, provider } = configureChains(networkds, [publicProvider()])

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
