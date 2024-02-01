import { BigNumber, ethers } from 'ethers'
import { ENetwork } from '../../../../types/ENetwork'
import { LOCAL_NETWORKS } from '../../../config'

const CURRENT_NETWORK =
  process.env.NEXT_PUBLIC_CURRENT_NETWORK || ENetwork.Local

const API_KEY = process.env.NEXT_PUBLIC_LOCAL_PRICE_API_KEY || ''

// When we deploy a CL Datafeed mock for local development, we hardcode the ETH price.
const DEVELOPMENT_ETH_PRICE = 2000

export const convertETHToUSD = async (value: string) => {
  try {
    // Use Chainlink Datafeed fallback on the local networks.
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

async function getETHPriceInUSD(): Promise<BigNumber | null> {
  try {
    const response = await fetch('/api/price?key=' + API_KEY)
    const data = await response.json()

    if (data == null || data?.price === undefined) {
      return null
    }

    return BigNumber.from(Math.round(data.price))
  } catch (e) {
    return null
  }
}
