import { BytesLike } from 'ethers'
import { FC } from 'react'
import { hexToString } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import { AgreementState } from '../../types/AgreementState'

type Props = {
  agreements: MarrySign.AgreementStruct[]
}
const AgreementList: FC<Props> = (props) => {
  const { agreements } = props

  if (agreements.length === 0) {
    return <></>
  }

  return (
    <div>
      {agreements
        .filter(
          (agreement: MarrySign.AgreementStruct) =>
            agreement.state == AgreementState.Accepted
        )
        .map((agreement: MarrySign.AgreementStruct) => (
          <div>{hexToString(agreement.content as BytesLike)}</div>
        ))}
    </div>
  )
}

export default AgreementList
