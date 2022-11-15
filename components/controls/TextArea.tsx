import c from 'clsx'
import { ChangeEvent, FC } from 'react'
import { placeholderText } from '../../lib/helpers'
import Label from './Label'

type Props = {
  id?: string
  label?: string
  description?: string
  placeholder?: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  required?: boolean
  [key: string]: any
}
const TextArea: FC<Props> = (props) => {
  const {
    id,
    label,
    placeholder,
    disabled,
    onChange,
    value,
    description,
    required,
    ...rest
  } = props

  return (
    <div className={c('my-2 field', { required: required })}>
      {value && label && <Label inputId={id}>{label}</Label>}
      <textarea
        id={id}
        name={id}
        placeholder={placeholderText(placeholder, label, required)}
        disabled={disabled}
        className="block w-full h-32 px-3 py-2 border rounded shadow-sm disabled:bg-secondary border-accent focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        onChange={onChange}
        value={value}
        {...rest}
      />
    </div>
  )
}

export default TextArea
