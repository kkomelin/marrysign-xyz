import { BytesLike } from 'ethers'
import { FC, MouseEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { absoluteAgreementUrl } from '../../lib/helpers'
import Button from './Button'
import c from 'clsx'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'

type Props = {
  agreementId: BytesLike
  className?: string
}
const CopyToClipboardButton: FC<Props> = ({ agreementId, className }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)

  // @todo: Pass url as a property to make the component agreement-independent.
  
  const sharedUrl = absoluteAgreementUrl(agreementId as BytesLike)

  return (
    <>
      <Button
        className={c('rounded-full !p-3 shadow-md !bg-white !text-primary hover:shadow', className)}
        onClick={async (e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault()

          try {
            await navigator.clipboard.writeText(sharedUrl)
            setIsClicked(true)
            toast('The link copied to clipboard.')
          } catch (err) {
            toast.error('An error has occurred. Please try again.')
            console.log(err)
          }
        }}
      >
        <ClipboardDocumentIcon className="w-10 h-10" />
        <span className='sr-only'>Copy link</span>
      </Button>

      {isClicked && (
        <a
          className="px-3 py-2 text-sm break-all hover:underline"
          href={sharedUrl}
          target="_blank"
        >
          {sharedUrl}
        </a>
      )}
    </>
  )
}

export default CopyToClipboardButton
