import { ChangeEvent, FC } from 'react'

type Props = {
  name?: string
  label?: string
  description?: string
  placeholder?: string
  disabled?: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  [key: string]: any
}
const TextArea: FC<Props> = (props) => {
  const {
    name,
    label,
    placeholder,
    disabled,
    onChange,
    value,
    description,
    ...rest
  } = props

  return (
    <div className='mt-2'>
      {value && label && (
        <div className="text-xs text-left text-gray-500 text-thin">{label}</div>
      )}
      <textarea
        name={name}
        placeholder={placeholder ? placeholder : label}
        disabled={disabled}
        className="block w-full h-32 px-3 py-2 border rounded shadow-sm disabled:bg-secondary border-accent focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  )
}

export default TextArea
