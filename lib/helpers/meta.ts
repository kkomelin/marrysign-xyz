import { BigNumber } from 'ethers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
import { APP_NAME } from '../config'
import { formatAgreementDate } from '../services/agreement/helpers'

export const agreementMetaTitle = (
  agreementContent: IAgreementContent | null,
  agreement?: MarrySign.AgreementStruct
) => {
  if (agreementContent == null || agreement?.updatedAt == null) {
    return
  }

  if (
    ![EAgreementState.Accepted, EAgreementState.Created].includes(
      Number(agreement.state)
    )
  ) {
    return
  }

  return (
    agreementContent.partner1.name +
    ' and ' +
    agreementContent.partner2.name +
    (Number(agreement.state) === EAgreementState.Created
      ? ' are going to get crypto-married on '
      : ' got crypto-married on ') +
    APP_NAME +
    (Number(agreement.state) === EAgreementState.Created
      ? ' soon'
      : ' on ' + formatAgreementDate(agreement?.updatedAt as BigNumber, 'PPP'))
  )
}
