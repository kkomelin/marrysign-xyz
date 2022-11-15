import { ArrowPathIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import c from 'clsx'
import {
  ChangeEvent,
  FC,
  FocusEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react'
import { convertUSDToETH } from '../../lib/services/chainlink'
import Label from './Label'

type Props = {
  id?: string
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
  value?: string | number
  description?: string
  required?: boolean
  [key: string]: any
}
const CurrencyField: FC<Props> = (props) => {
  const {
    id,
    onChange,
    disabled = false,
    placeholder,
    value,
    label,
    description,
    required = false,
    ...rest
  } = props

  const [valueInUSD, setValueInUSD] = useState<number | undefined>(
    Number(value)
  )
  const [valueInETH, setValueInETH] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const handleUSDInputBlur = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value == null) {
      setValueInETH(0)
      return
    }
    const value = Number(e.target.value)
    await updateETH(value)
  }

  const handleUSDInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValueInUSD(e.target.value ? Number(e.target.value) : undefined)
    setValueInETH(0)
    onChange(e)
  }

  const handleETHInputClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await updateETH(valueInUSD)
  }

  const updateETH = async (value: number | undefined) => {
    setLoading(true)
    if (value === undefined || value == null || value === 0) {
      setValueInETH(0)
      setLoading(false)
      return
    }

    const amountInETH = await convertUSDToETH(value)
    setValueInETH(amountInETH)
    setLoading(false)
  }

  useEffect(() => {
    if (value) {
      updateETH(Number(value))
    }
  }, [])

  let valueUSDProp = {}
  if (valueInUSD !== undefined) {
    valueUSDProp = { value: valueInUSD }
  }

  let valueETHProp = {}
  if (valueInETH !== undefined) {
    valueETHProp = { value: valueInETH }
  }

  return (
    <div className={c('my-2 field', { required: required })}>
      {label && <Label inputId={id}>{label}</Label>}
      <div className="flex flex-row">
        <div className="flex flex-row items-center border shadow-sm rounded-l-md border-accent bg-gray-50">
          <div className="px-3 py-3 text-xs font-semibold border-r border-gray-200">
            USD
          </div>
          <input
            id={id}
            name={id}
            disabled={disabled}
            className="block w-full px-3 py-3 border border-transparent currency-input placeholder-input focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            type="number"
            step="any"
            onChange={handleUSDInputChange}
            onBlur={handleUSDInputBlur}
            {...valueUSDProp}
            {...rest}
          />
        </div>

        <div className="flex flex-row items-center border shadow-sm rounded-r-md border-accent bg-gray-50">
          <button
            onClick={handleETHInputClick}
            className={c(
              'flex flex-row items-center justify-center order-2 px-3 py-3 text-xs font-semibold border-l border-gray-200 cursor-pointer'
            )}
          >
            ETH
            {loading ? (
              <ArrowPathIcon className="ml-1 w-[12px] text-primary animate-spin" />
            ) : (
              <ChevronRightIcon className="ml-1 w-[12px] text-primary" />
            )}
          </button>
          <input
            disabled={true}
            className="order-1 block w-full px-3 py-3 placeholder-input focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            type="text"
            {...valueETHProp}
          />
        </div>
      </div>
      {description && (
        <div className="block mt-2 text-xs text-left text-gray-500 text-thin">
          {description}
          <div className="mt-1">
            * The amount in ETH is provided for your reference only and it can
            change to the moment of agreement termination.
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyField
