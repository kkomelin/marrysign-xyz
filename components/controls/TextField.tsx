import { ChangeEvent, FC } from 'react'

type Props = {
  id?: string
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  value?: string
  description?: string
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
  } = props

  return (
    <div className="mt-2">
      {value && label && (
        <label
          htmlFor={id}
          className="block text-xs text-left text-gray-500 text-thin"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        disabled={disabled}
        className="block w-full px-3 py-3 border rounded-md shadow-sm placeholder-input border-accent focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
        placeholder={placeholder ? placeholder : label}
        type="text"
        onChange={onChange}
        value={value}
      />
      {description && <div>{description}</div>}
    </div>
  )
}

export default TextField
