import { BytesLike } from 'ethers'
import { FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { absoluteAgreementUrl } from '../../lib/helpers'
import { MarrySign } from '../../typechain'
import Button from '../controls/Button'
import AgreementQRCode from '../misc/AgreementQRCode'

type Props = {
  agreement: MarrySign.AgreementStruct | null
}
const AgreementShareBlock: FC<Props> = (props) => {
  const { agreement } = props
  const [isClicked, setIsClicked] = useState<boolean>(false)

  if (!agreement) {
    return <></>
  }

  const sharedUrl = absoluteAgreementUrl(agreement.id as BytesLike)

  return (
    <div className="w-full max-w-xs p-2 my-3">
      <div className="flex flex-col items-center justify-center">
        <Button
          className="rounded-sm !p-3 !bg-white !text-primary shadow hover:shadow-md"
          onClick={async (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()

            try {
              await navigator.clipboard.writeText(sharedUrl)
              setIsClicked(true)
              toast('The link copied to clipboard')
            } catch (err) {
              toast.error('An error has occurred. Please try again.')
              console.log(err)
            }
          }}
        >
          <AgreementQRCode id={agreement.id as BytesLike} />
          <div className="text-sm text-gray-400">click to copy</div>
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <a
          className="px-3 py-2 text-sm text-center break-all hover:underline"
          href={sharedUrl}
          target="_blank"
        >
          {sharedUrl}
        </a>
      </div>
    </div>
  )
}

export default AgreementShareBlock
