import c from 'clsx'
import { FC, MouseEvent, PropsWithChildren } from 'react'

type Props = {
  name?: string
  color?: 'primary' | 'secondary'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}
const Button: FC<PropsWithChildren<Props>> = (props) => {
  const {
    onClick,
    disabled = false,
    children,
    name,
    type = 'button',
    color = 'primary',
    className,
  } = props

  let classNameBase =
    'block px-3 py-2 mt-2 text-white border rounded-lg bg-primary disabled:bg-gray-200'
  if (color == 'secondary') {
    classNameBase =
      'block px-3 py-2 mt-2 text-white border rounded-lg bg-secondary disabled:bg-gray-200'
  }

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      className={c(classNameBase, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
