import { BigNumberish, BytesLike } from 'ethers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { APP_NAME } from '../config'
import { absoluteAgreementUrl } from '../helpers'

export const agreementStateToShortString = (
  state: string | number | BigNumberish
) => {
  return EAgreementState[Number(state)].toString()
}

export const agreementShareData = (agreement: MarrySign.AgreementStruct) => {
  return {
    title: APP_NAME,
    text: 'Check out this agreement on ' + APP_NAME,
    url: absoluteAgreementUrl(agreement.id as BytesLike),
  }
}
