import { BytesLike } from 'ethers'
import { FC } from 'react'
import { hexToString } from '../lib/helpers'
import { MarrySign } from '../typechain'

type Props = {
  agreements: MarrySign.AgreementStruct[]
}
const AgreementList: FC<Props> = (props) => {
  const { agreements } = props

  if (agreements.length === 0) {
    return <></>
  }

  return (
    <div className="w-full mt-6">
      {agreements
        // .filter(
        //   (agreement: MarrySign.AgreementStruct) =>
        //     agreement.state == AgreementState.Accepted
        // )
        .map((agreement: MarrySign.AgreementStruct, index: number) => {
          const content = JSON.parse(
            hexToString(agreement.content as BytesLike)
          )

          return (
            <div
              key={index}
              className="p-0.5 my-3 border rounded bg-gradient-to-r from-pink-600 via-indigo-500 to-purple-400"
            >
              <div className="p-3 bg-white rounded">
                {content.partner1.name} + {content.partner2.name}
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default AgreementList
