import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
  coinbaseWallet,
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { chain, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME } from '../config'
import { isProd } from '../helpers'

let networkds = [
  chain.mainnet,
  // chain.polygon,
  // chain.optimism,
  // chain.arbitrum
]

if (!isProd()) {
  networkds = [
    // chain.goerli, 
    chain.hardhat, 
    // chain.localhost
  ]
}

const { chains, provider } = configureChains(networkds, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
  publicProvider(),
])

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: APP_NAME, chains }),
      walletConnectWallet({ chains }),
      trustWallet({ chains }),
    ],
  },
])
// const { connectors } = getDefaultWallets({
//   appName: APP_NAME,
//   chains,
// })

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export default {
  chains,
  wagmiClient,
}
