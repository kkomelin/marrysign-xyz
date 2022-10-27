import { BytesLike, ethers } from 'ethers'

export const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

export const stringToHex = (text: string): string => {
  return ethers.utils.hexlify(ethers.utils.toUtf8Bytes(text))
}

export const hexToString = (hex: BytesLike): string => {
  return ethers.utils.toUtf8String(hex)
}

export const hasEthereum = (): boolean => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
}

export const nowTimestamp = (): number => {
  return Math.round(Date.now() / 1000)
}

export const randomNum = (maxNum: number): number => {
  return Math.floor(Math.random() * maxNum)
}
