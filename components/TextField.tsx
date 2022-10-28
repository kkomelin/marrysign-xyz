import { ChangeEvent, FC } from 'react'

type Props = {
  name?: string
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  value?: string
  description?: string
}
const TextField: FC<Props> = (props) => {
  const {
    onChange,
    disabled = false,
    name,
    placeholder,
    value,
    label,
    description,
  } = props

  return (
    <div className='mt-2'>
      {value && label && (
        <div className="text-xs text-left text-gray-500 text-thin">{label}</div>
      )}
      <input
        disabled={disabled}
        className="block w-full px-3 py-3 border rounded-md shadow-sm placeholder-input border-accent focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
        placeholder={placeholder ? placeholder : label}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default TextField
