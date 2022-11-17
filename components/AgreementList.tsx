import c from 'clsx'
import { BytesLike } from 'ethers'
import Link from 'next/link'
import { FC } from 'react'
import { parseAgreementContent } from '../lib/content'
import { agreementPath } from '../lib/helpers'
import { MarrySign } from '../typechain'
import { EAgreementState } from '../types/EAgreementState'
import AgreementStateVisualization from './misc/AgreementStateVisualization'

type Props = {
  agreements: MarrySign.AgreementStruct[]
  userAgreementId?: BytesLike
}
const AgreementList: FC<Props> = (props) => {
  const { agreements, userAgreementId } = props

  return (
    <div className="w-full mt-4">
      {agreements.length === 0 && <p>There are no accepted agreements yet</p>}

      {agreements.length > 0 && (
        <div className="flex flex-row flex-wrap justify-center gap-5">
          {agreements.map(
            (agreement: MarrySign.AgreementStruct, index: number) => {
              const content = parseAgreementContent(
                agreement.content as BytesLike
              )

              return (
                <Link
                  key={index}
                  href={agreementPath(agreement.id as BytesLike)}
                  className="max-w-[240px]"
                >
                  <div
                    className={c(
                      'p-3 rounded-xl flex flex-col items-center justify-center border',
                      userAgreementId === agreement.id
                        ? 'border-pink-300'
                        : 'border-gray-300'
                    )}
                  >
                    <AgreementStateVisualization
                      state={agreement.state as EAgreementState}
                      className="w-full px-6 py-2"
                    />
                    <div className="p-2">
                      {content.partner1.name} + {content.partner2.name}
                    </div>
                  </div>
                </Link>
              )
            }
          )}
        </div>
      )}
    </div>
  )
}

export default AgreementList
