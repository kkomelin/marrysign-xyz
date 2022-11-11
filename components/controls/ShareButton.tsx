import { FC, MouseEvent } from 'react'
import { toast } from 'react-toastify'
import { agreementShareData } from '../../lib/contract/helpers'
import { MarrySign } from '../../typechain'
import Button from './Button'

type Props = {
  agreement: MarrySign.AgreementStruct
}
const ShareButton: FC<Props> = ({ agreement }) => {
  const shareData = agreementShareData(agreement)

  return (
    <Button
      onClick={async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
          await navigator.share(shareData)
          toast('Shared successfully')
        } catch (err) {
          toast.error('An error has occurred. Please try again.')
          console.log(err)
        }
      }}
    >
      Share
    </Button>
  )
}

export default ShareButton
