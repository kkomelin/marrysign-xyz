import { BigNumber, ethers } from 'ethers'
import { ENetwork } from '../../../../types/ENetwork'
import { LOCAL_NETWORKS } from '../../../config'

const CURRENT_NETWORK =
  process.env.NEXT_PUBLIC_CURRENT_NETWORK || ENetwork.Local

// When we deploy a CL Datafeed mock for local development, we hardcode the ETH price.
const DEVELOPMENT_ETH_PRICE = 2000

export const convertETHToUSD = async (value: string) => {
  try {
    // Use Chainling Datafeed fallback on the local networks.
    if (LOCAL_NETWORKS.includes(CURRENT_NETWORK)) {
      return ethers.utils.formatEther(
        ethers.utils.parseEther(value).mul(DEVELOPMENT_ETH_PRICE)
      )
    }

    const priceOfOneETH = await getETHPriceInUSD()
    if (priceOfOneETH == null || priceOfOneETH.eq(0)) {
      return '0'
    }

    return ethers.utils.formatEther(
      ethers.utils.parseEther(value).mul(priceOfOneETH)
    )
  } catch (e) {
    console.error(e)
    return '0'
  }
}

async function getETHPriceInUSD() {
  const response = await fetch(
    'https://api.coinstats.app/public/v1/coins/ethereum?currency=USD'
  )
  const data = await response.json()

  return BigNumber.from(Math.round(data.coin.price))
}
