import { BigNumberish, BytesLike } from 'ethers'
import { FC } from 'react'
import { agreementStateToShortString } from '../../lib/contract/helpers'
import { MarrySign } from '../../typechain'
import { EAgreementState } from '../../types/EAgreementState'
import { IAgreementContent } from '../../types/IAgreementContent'
import CopyToClipboardButton from '../controls/CopyToClipboardButton'
import AccordionItem from '../misc/AccordionItem'
import AgreementQRCode from '../misc/AgreementQRCode'
import AgreementStateVisualization from '../misc/AgreementStateVisualization'

type Props = {
  agreement: MarrySign.AgreementStruct | null
  agreementContent: IAgreementContent | null
}
const AgreementInfoBlock: FC<Props> = (props) => {
  const { agreement, agreementContent } = props

  if (!agreement || !agreementContent) {
    return <></>
  }

  let state = agreementStateToShortString(agreement.state as BigNumberish)

  // Adapt the state language because it's Cancelled for Alice and Refused for Bob.
  if (agreement.state === EAgreementState.Refused) {
    state = state + '/Cancelled'
  }

  return (
    <div className="w-full max-w-md text-center">
      <div className="py-1">
        <b className="text-2xl text-secondary">
          {agreementContent.partner2.name}
        </b>{' '}
        &{' '}
        <b className="text-2xl text-secondary">
          {agreementContent.partner1.name}
        </b>
      </div>
      <div className="py-1">
        promissed to each other the following:
        <br />
        <br />
        <b className="text-lg leading-6 text-primary text-semibold">
          {agreementContent.vow}
        </b>
      </div>
      <div className="flex flex-col items-center justify-start py-3 my-3">
        <AgreementStateVisualization
          state={agreement.state as EAgreementState}
          className="w-[200px]"
        />
        <div className="text-secondary">{state}</div>
      </div>

      <AccordionItem title="Share" open={false}>
        <div className="w-full max-w-xs p-6 m-6">
          {/* <div className="py-1 break-all">
            ID: <br /> {agreement.id.toString()}
          </div> */}
          <div className="flex flex-col items-center justify-center">
            <AgreementQRCode id={agreement.id as BytesLike} />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <CopyToClipboardButton
              className="w-full"
              agreementId={agreement.id as BytesLike}
            />
            {/* <ShareButton agreement={agreement} /> */}
          </div>
        </div>
      </AccordionItem>
    </div>
  )
}

export default AgreementInfoBlock
