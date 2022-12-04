/**
 * Some chainlink-related code has been borrowed from 
 * https://github.com/smartcontractkit/chainlink-in-web2-fh22/blob/main/src/utils/getETHPrice.js
 * which is authored by https://github.com/rgottleber
 */
import { ethers } from 'ethers'
import { ENetwork } from '../../../types/ENetwork'
import { LOCAL_NETWORKS } from '../../config'
import { aggregatorV3InterfaceABI } from './abi'

const CHAINLINK_NODE_URL =
  process.env.NEXT_PUBLIC_CHAINLINK_PRICE_FEED_WEB2_RPC_URL || undefined
const CHAINLINK_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CHAINLINK_PRICE_FEED_WEB2_CONTRACT_ADDRESS ||
  undefined
const CURRENT_NETWORK =
  process.env.NEXT_PUBLIC_CURRENT_NETWORK || ENetwork.Local

// When we deploy a CL Datafeed mock for local development, we hardcode the ETH price.
const DEVELOPMENT_ETH_PRICE = 2000

export const convertETHToUSD = async (value: string) => {
  try {
    if (LOCAL_NETWORKS.includes(CURRENT_NETWORK)) {
      console.log(
        `[development] CL DataFeed fallback used. Assuming that ETH price = ${DEVELOPMENT_ETH_PRICE}`
      )
      return ethers.utils.formatEther(
        ethers.utils.parseEther(value).mul(DEVELOPMENT_ETH_PRICE)
      )
    }

    // @todo: Provide a fallback for Chainlink data feed in case if it's not available.

    const priceOfOneETH = await getETHPriceInUSD()
    if (priceOfOneETH == null || priceOfOneETH == 0) {
      return '0'
    }

    return ethers.utils.formatEther(
      ethers.utils.parseEther(value).mul(priceOfOneETH)
    )
  } catch (e) {
    console.log(e)
    return '0'
  }
}

export async function getETHPriceInUSD() {
  if (CHAINLINK_NODE_URL == null || CHAINLINK_CONTRACT_ADDRESS == null) {
    throw new Error('Please set Chainlink details through your .env file.')
  }

  var provider = new ethers.providers.JsonRpcProvider(CHAINLINK_NODE_URL)

  const priceFeed = new ethers.Contract(
    CHAINLINK_CONTRACT_ADDRESS,
    aggregatorV3InterfaceABI,
    provider
  )
  let roundData = await priceFeed.latestRoundData()
  let decimals = await priceFeed.decimals()
  return Number(
    (roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)
  )
}
