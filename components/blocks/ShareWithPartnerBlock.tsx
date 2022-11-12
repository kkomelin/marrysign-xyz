import { BytesLike } from 'ethers'
import { FC } from 'react'
import { agreementPath } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import ButtonLink from '../controls/ButtonLink'
import ShareBlock from './ShareBlock'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const ShareWithPartnerBlock: FC<Props> = (props) => {
  const { agreement } = props

  if (!agreement) {
    return <></>
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm p-6 my-6">
      <div className="py-2 text-center">
        Your agreement is created.
        <br />
        Next step is to share it with your loved one!
      </div>

      <ShareBlock agreement={agreement} />

      <ButtonLink href={agreementPath(agreement.id as BytesLike)}>
        Done
      </ButtonLink>
    </div>
  )
}

export default ShareWithPartnerBlock
