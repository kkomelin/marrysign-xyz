import c from 'clsx'
import { FC, MouseEvent, PropsWithChildren } from 'react'

type Props = {
  name?: string
  color?: 'primary' | 'secondary' | 'tertiary'
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  description?: string
  size?: 'normal' | 'large'
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
    description,
    size = 'normal',
  } = props

  let classNameBase =
    'block mt-2 text-white border-transparent rounded-lg bg-primary disabled:bg-gray-200 font-semibold'
  if (color == 'secondary') {
    classNameBase =
      'block mt-2 text-white border border-transparent rounded-lg bg-secondary disabled:bg-gray-200 font-semibold'
  }

  let sizeClasses = 'px-4 py-2 text-base'
  if (size === 'large') {
    sizeClasses = 'px-8 py-4 text-lg uppercase'
  }

  return (
    <div className="my-2">
      <button
        type={type}
        name={name}
        disabled={disabled}
        className={c(classNameBase, sizeClasses, className)}
        onClick={onClick}
      >
        {children}
      </button>
      {description && (
        <div className="block mt-1 text-xs text-center text-gray-500 text-thin">
          {description}
        </div>
      )}
    </div>
  )
}

export default Button
