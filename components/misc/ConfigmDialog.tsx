import { Dialog } from '@headlessui/react'
import { FC, MouseEvent } from 'react'
import Button from '../controls/Button'

type Props = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  confirmButtonLabel: string
  onConfirm: () => void
  onCancel?: () => void
}
const ConfirmDialog: FC<Props> = (props) => {
  const {
    open,
    onClose,
    onConfirm,
    onCancel,
    confirmButtonLabel,
    title,
    description,
  } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-opacity-90 bg-pink-50" />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full max-w-md p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
          <Dialog.Title
            as="h3"
            className="mx-2 mt-2 mb-4 text-lg font-bold leading-6 text-gray-900"
          >
            {title}
          </Dialog.Title>
          <Dialog.Description className="mx-2 mt-1">
            {description}
          </Dialog.Description>

          <div className="flex flex-row justify-between w-full px-2 mt-3">
            <Button
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                if (onCancel) {
                  onCancel()
                }
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button
              color="secondary"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                onConfirm()
                onClose()
              }}
            >
              {confirmButtonLabel}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
