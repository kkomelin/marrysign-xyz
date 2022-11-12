import { format } from 'date-fns'
import { BigNumberish, BytesLike } from 'ethers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
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
      return 'Agreement signed'
    case EAgreementState.Refused:
      return 'Agreement cancelled/refused'
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
