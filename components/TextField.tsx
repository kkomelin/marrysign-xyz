import { ChangeEvent, FC } from 'react'

type Props = {
  name?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  value?: string
}
const TextField: FC<Props> = (props) => {
  const { onChange, disabled = false, name, placeholder, value } = props

  return (
    <input
      disabled={disabled}
      className="block w-full px-3 py-3 border rounded-md shadow-sm placeholder-input border-accent focus:outline-none focus:ring-light-blue-500 focus:border-light-blue-500 sm:text-sm"
      placeholder={placeholder}
      type="text"
      name={name}
      onChange={onChange}
      value={value}
    />
  )
}

export default TextField
