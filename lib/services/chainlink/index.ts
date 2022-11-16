/**
 * Some chainlink-related code has been borrowed from https://github.com/smartcontractkit/chainlink-in-web2-fh22/blob/main/src/utils/getETHPrice.js
 * which is authored by https://github.com/rgottleber
 */
import { ethers } from 'ethers'
import { isProd } from '../../helpers'
import { aggregatorV3InterfaceABI } from './abi'

const CHAINLINK_NODE_URL =
  process.env.NEXT_PUBLIC_CHAINLINK_RPC_URL ||
  'https://api.avax-test.network/ext/bc/C/rpc'
const CHAINLINK_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CHAINLINK_CONTRACT_ADDRESS ||
  '0x86d67c3D38D2bCeE722E601025C25a575021c6EA'

// When we deploy a CL Datafeed mock for local development, we hardcode the ETH price.
const DEVELOPMENT_ETH_PRICE = 2000

export const convertUSDToETH = async (amountInUSD: number) => {
  try {
    if (!isProd()) {
      console.log(
        `[development] CL DataFeed fallback used. Assuming that ETH price = ${DEVELOPMENT_ETH_PRICE}`
      )
      return amountInUSD / DEVELOPMENT_ETH_PRICE
    }

    console.log('CL DataFeed requested')

    const priceOfOneETH = await getETHPriceInUSD()
    if (priceOfOneETH == null || priceOfOneETH == 0) {
      return 0
    }

    return amountInUSD / priceOfOneETH
  } catch (e) {
    console.log(e)
    return 0
  }
}

export async function getETHPriceInUSD() {
  if (CHAINLINK_NODE_URL == null || CHAINLINK_CONTRACT_ADDRESS == null) {
    throw new Error('Please set Chainlink details through your .env.')
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
