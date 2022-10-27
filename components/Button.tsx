import { FC, MouseEvent, PropsWithChildren } from 'react'

type Props = {
  name?: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}
const Button: FC<PropsWithChildren<Props>> = (props) => {
  const { onClick, disabled = false, children, name, type = 'button' } = props

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      className="block px-3 py-2 mt-2 text-white border rounded-lg bg-secondary disabled:bg-gray-200"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
