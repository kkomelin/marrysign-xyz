import c from 'clsx'
import { ChangeEvent, FC } from 'react'
import { placeholderText } from '../../lib/helpers'
import Label from './Label'

type Props = {
  id?: string
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  value?: string | number
  description?: string
  type?: 'text' | 'number'
  required?: boolean
  [key: string]: any
}
const TextField: FC<Props> = (props) => {
  const {
    id,
    onChange,
    disabled = false,
    placeholder,
    value,
    label,
    description,
    type = 'text',
    required = false,
    ...rest
  } = props

  return (
    <div className={c('my-2 field', { required: required })}>
      {value && label && <Label inputId={id}>{label}</Label>}
      <input
        id={id}
        name={id}
        disabled={disabled}
        className="block w-full px-3 py-3 border rounded-md shadow-sm placeholder-input border-accent focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
        placeholder={placeholderText(placeholder, label, required)}
        type={type}
        onChange={onChange}
        value={value}
        {...rest}
      />
      {description && (
        <div className="block mt-1 text-xs text-left text-gray-500 text-thin">
          {description}
        </div>
      )}
    </div>
  )
}

export default TextField
