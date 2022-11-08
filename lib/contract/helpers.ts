import { BigNumberish } from 'ethers'
import { EAgreementState } from '../../types/EAgreementState'

export const contractStateToString = (state: string | BigNumberish) => {
  return EAgreementState[Number(state) as number].toString()
}
