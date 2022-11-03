import { BytesLike } from 'ethers'
import Link from 'next/link'
import { FC } from 'react'
import { hexToString } from '../lib/helpers'
import { MarrySign } from '../typechain'

type Props = {
  agreements: MarrySign.AgreementStruct[]
}
const AgreementList: FC<Props> = (props) => {
  const { agreements } = props

  return (
    <div className="w-full mt-6">
      {agreements.length === 0 && (
        <p>
          We have no agreements accepted yet. We'd be happy if yours was{' '}
          <Link href="/agreement/create">the first</Link>.
        </p>
      )}
      {agreements
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
