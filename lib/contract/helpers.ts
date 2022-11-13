import { format } from 'date-fns'
import { BigNumberish, BytesLike } from 'ethers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
import { IExtractPropsFromArray } from '../../types/IExtractPropsFromArray'
import { APP_NAME } from '../config'
import { absoluteAgreementUrl } from '../helpers'

export const agreementStateToShortString = (
  state: string | number | BigNumberish
) => {
  return EAgreementState[Number(state)].toString()
}

export const agreementStateToLongString = (
  state: string | number | BigNumberish,
  agreementContent: IAgreementContent
) => {
  switch (state) {
    case EAgreementState.Created:
      return `Waiting for ${agreementContent.partner2.name} to accept the agreement`
    case EAgreementState.Accepted:
      return 'Signed'
    case EAgreementState.Refused:
      return 'Cancelled/refused'
    default:
      return ''
  }
}

export const agreementShareData = (agreement: MarrySign.AgreementStruct) => {
  return {
    title: APP_NAME,
    text: 'Check out this agreement on ' + APP_NAME,
    url: absoluteAgreementUrl(agreement.id as BytesLike),
  }
}

export const toTimestamp = (
  contractTimestamp: BigNumberish | number
): number => {
  return Number(contractTimestamp.toString() + '000')
}

export const formatContractDate = (
  contractTimestamp: BigNumberish | number
) => {
  return format(toTimestamp(contractTimestamp), 'PPPP')
}

/**
 * Take an array returned by contract and convert it to JS object.
 * Borrowed from https://github.com/ethers-io/ethers.js/discussions/2429#discussioncomment-3765296
 */
export const contractStructToObject = <A extends Array<unknown>>(
  arr: A
): IExtractPropsFromArray<A> => {
  const keys = Object.keys(arr).filter((key) => isNaN(Number(key)))
  const result = {}
  // @ts-ignore
  arr.forEach((item, index) => (result[keys[index]] = item))
  return result as A
}
