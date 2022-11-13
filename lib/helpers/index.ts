import { BytesLike, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { ICustomContractError } from '../../types/ICustomContractError'
import { APP_URL } from '../config'
import { USER_FRIENDLY_ERROR_MESSAGE } from '../config/strings'

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

export const handleContractErrorSilently = (e: ICustomContractError) => {
  console.error(e)
  console.error(e.errorName)
}

export const handleContractError = (e: ICustomContractError) => {
  let errorMessage = USER_FRIENDLY_ERROR_MESSAGE

  if (e?.code == 'ACTION_REJECTED') {
    toast.warn(
      "Seems like you rejected the transaction. Let's maybe try one more time"
    )
  } else {
    toast.error(errorMessage)
  }

  console.error(e)
  console.error(e.errorName)
}

export const isAbsolute = (url: string): boolean => {
  const r = new RegExp('^(?:[a-z]+:)?//', 'i')
  return r.test(url)
}
export const toAbsolute = (url: string): string => {
  if (isAbsolute(url)) {
    return url
  }

  return `${APP_URL}${url}`
}

export const stripHtml = (str: string): string => {
  return str.replace(/(<([^>]+)>)/gi, '')
}

export const agreementPath = (agreementId: BytesLike): string => {
  return `/a/${agreementId.toString()}`
}

export const absoluteAgreementUrl = (agreementId: BytesLike): string => {
  return toAbsolute(agreementPath(agreementId))
}

export const placeholderText = (
  placeholder?: string,
  label?: string,
  required?: boolean
) => {
  return (placeholder ? placeholder : label) + (required ? ' *' : '')
}
