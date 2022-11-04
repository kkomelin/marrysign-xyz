import { BytesLike } from 'ethers'
import { IAgreementContent } from '../../types/IAgreementContent'
import { hexToString } from '../helpers'

export const parseAgreementContent = (content: BytesLike): IAgreementContent => {
  return JSON.parse(hexToString(content))
}
