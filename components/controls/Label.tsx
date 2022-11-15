import { FC, PropsWithChildren } from 'react'

type Props = {
  inputId?: string
}
const Label: FC<PropsWithChildren<Props>> = (props) => {
  const { children, inputId } = props

  return (
    <label
      htmlFor={inputId}
      className="block mb-1 text-sm text-left text-gray-800"
    >
      {children}
    </label>
  )
}

export default Label
