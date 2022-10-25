import { BytesLike, ethers } from 'ethers'

export const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

export const hexToString = (hex: BytesLike): string => {
  return ethers.utils.toUtf8String(hex)
}
