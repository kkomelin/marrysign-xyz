import { FC, PropsWithChildren } from 'react'

type Props = {
  inputId?: string
}
const Label: FC<PropsWithChildren<Props>> = (props) => {
  const { children, inputId } = props

  return (
    <label
      htmlFor={inputId}
      className="block text-sm text-left text-gray-700 text-thin"
    >
      {children}
    </label>
  )
}

export default Label
