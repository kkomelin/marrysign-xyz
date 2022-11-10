import { BigNumberish, BytesLike } from 'ethers'
import { FC } from 'react'
import { contractStateToString } from '../../lib/contract/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
import CopyToClipboardButton from '../controls/CopyToClipboardButton'
import AgreementQRCode from '../misc/AgreementQRCode'

type Props = {
  agreement: MarrySign.AgreementStruct | null
  agreementContent: IAgreementContent | null
}
const AgreementInfoBlock: FC<Props> = (props) => {
  const { agreement, agreementContent } = props

  if (!agreement || !agreementContent) {
    return <></>
  }

  let state = contractStateToString(agreement.state as BigNumberish)

  // Adapt the state language because it's Cancelled for Alice and Refused for Bob.
  if (agreement.state === EAgreementState.Refused) {
    state = state + '/Cancelled'
  }

  return (
    <div className="w-full max-w-sm text-center">
      <div className="p-6 my-6 border rounded-sm">
        <div className="py-1 break-all">
          ID: <br /> {agreement.id.toString()}
        </div>
        <div className="flex flex-col items-center justify-center">
          <AgreementQRCode id={agreement.id as BytesLike} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <CopyToClipboardButton agreementId={agreement.id as BytesLike} />
        </div>
      </div>

      <div className="py-1">
        <b>{agreementContent.partner2.name}</b> and{' '}
        <b>{agreementContent.partner1.name}</b>
      </div>
      <div className="py-1">
        promissed to each other the following:
        <br />
        <br />
        <b>{agreementContent.vow}</b>
      </div>
      <div className="py-1">State: {state}</div>
    </div>
  )
}

export default AgreementInfoBlock
