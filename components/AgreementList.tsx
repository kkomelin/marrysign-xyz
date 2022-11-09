import c from 'clsx'
import { BytesLike } from 'ethers'
import Link from 'next/link'
import { FC } from 'react'
import { parseAgreementContent } from '../lib/content'
import { agreementPath } from '../lib/helpers'
import { MarrySign } from '../typechain'

type Props = {
  agreements: MarrySign.AgreementStruct[]
  userAgreementId?: BytesLike
}
const AgreementList: FC<Props> = (props) => {
  const { agreements, userAgreementId } = props

  return (
    <div className="w-full mt-6">
      {agreements.length === 0 && <p>There are no accepted agreements yet</p>}

      {agreements.map((agreement: MarrySign.AgreementStruct, index: number) => {
        const content = parseAgreementContent(agreement.content as BytesLike)

        return (
          <Link
            key={index}
            href={agreementPath(agreement.id as BytesLike)}
            className={c(
              'block p-0.5 my-3 border rounded bg-gradient-to-r from-pink-600 via-indigo-500 to-purple-400'
            )}
          >
            <div
              className={c(
                'p-3 rounded',
                userAgreementId === agreement.id ? 'bg-pink-300' : 'bg-white'
              )}
            >
              {content.partner1.name} + {content.partner2.name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default AgreementList
