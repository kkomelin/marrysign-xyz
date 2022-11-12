import { BigNumberish, BytesLike } from 'ethers'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import {
  agreementStateToLongString,
  formatContractDate,
} from '../../lib/contract/helpers'
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

  const { address } = useAccount()

  if (!agreement || !agreementContent) {
    return <></>
  }

  let state = agreementStateToLongString(
    agreement.state as BigNumberish,
    agreementContent
  )

  const date = formatContractDate(agreement.updatedAt as BigNumberish)

  return (
    <div className="w-full max-w-2xl px-6 py-2 text-lg text-center md:py-4">
      {agreement.state === EAgreementState.Accepted && (
        <div className="py-3 text-gray-500">On {date}</div>
      )}
      <div className="py-3">
        <span className="text-5xl text-secondary font-cursive ">
          {agreementContent.partner2.name}
        </span>{' '}
        <span className="block p-4 text-2xl text-gray-500 md:inline">&</span>{' '}
        <span className="text-5xl text-secondary font-cursive ">
          {agreementContent.partner1.name}
        </span>
      </div>
      <div className="p-4 text-gray-500 text-md">
        {agreement.state === EAgreementState.Accepted
          ? 'promised the following to each other'
          : 'vow'}
      </div>
      <div className="py-3 text-5xl leading-10 text-primary font-cursive">
        {agreementContent.vow}
      </div>

      <div className="flex flex-col items-center justify-start py-3 mt-5 mb-8">
        <AgreementStateVisualization
          state={agreement.state as EAgreementState}
          className="w-[180px]"
        />
        <div className="max-w-sm mt-2 text-gray-500 text-md">{state}</div>
      </div>

      {agreement && agreement.state !== EAgreementState.Refused && (
        <AccordionItem
          title={
            agreement &&
            agreement.alice === address &&
            agreement.state === EAgreementState.Created
              ? 'Invite your partner'
              : 'Spread the word'
          }
          open={false}
          className="mt-6"
        >
          <div className="w-full max-w-xs p-6 m-6">
            <div className="flex flex-col items-center justify-center">
              <AgreementQRCode id={agreement.id as BytesLike} />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <CopyToClipboardButton agreementId={agreement.id as BytesLike} />
              {/* <ShareButton agreement={agreement} /> */}
            </div>
          </div>
        </AccordionItem>
      )}
    </div>
  )
}

export default AgreementInfoBlock
