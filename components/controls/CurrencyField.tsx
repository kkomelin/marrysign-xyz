import { ArrowPathIcon } from '@heroicons/react/20/solid'
import c from 'clsx'
import { ChangeEvent, FC, FocusEvent, useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { validateCurrency } from '../../lib/helpers'
import { convertETHToUSD } from '../../lib/services/chainlink'
import Label from './Label'

type Props = {
  id?: string
  label?: string
  onChange: (value: string) => void
  placeholder?: string
  description?: string
  required?: boolean
  defaultETHValue?: string
  [key: string]: any
}
const CurrencyField: FC<Props> = (props) => {
  const {
    id,
    onChange,
    label,
    description,
    required = false,
    defaultETHValue,
    ...rest
  } = props

  const [valueInUSD, setValueInUSD] = useState<string | undefined>(undefined)
  const [inputValueInETH, setInputValueInETH] = useState<string>(
    defaultETHValue ? defaultETHValue : '0'
  )

  const [loading, setLoading] = useState<boolean>(false)

  const debouncedChangeHandler = useDebouncedCallback(async (value: string) => {
    onChange(value)
  }, 700)

  const handleETHInputBlur = async (e: FocusEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.value == null) {
      setInputValueInETH('0')
      return
    }

    await updateUSD(e.target.value)
  }

  const handleETHInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInputValueInETH(e.target.value)
    setValueInUSD(undefined)
    debouncedChangeHandler(e.target.value)
  }

  const updateUSD = async (valueInETF: string) => {
    // Don't send one more request if we're waiting for a response already.
    if (loading) {
      return
    }

    setLoading(true)
    if (
      valueInETF === undefined ||
      valueInETF == null ||
      valueInETF.trim().length === 0 ||
      !validateCurrency(valueInETF)
    ) {
      setValueInUSD('')
      setLoading(false)
      return
    }

    const amountInUSD = await convertETHToUSD(valueInETF)

    setValueInUSD(amountInUSD)
    setLoading(false)
  }

  useEffect(() => {
    if (defaultETHValue) {
      updateUSD(defaultETHValue)
    }
  }, [defaultETHValue])

  return (
    <div className={c('my-2 field', { required: required })}>
      {label && <Label inputId={id}>{label}</Label>}
      <div className="flex flex-row">
        <div className="flex flex-row items-center border shadow-sm rounded-l-md border-accent bg-gray-50">
          <button className="flex flex-row items-center justify-center px-3 py-3 text-xs font-semibold border-r border-gray-200">
            ETH
          </button>
          <input
            className="block w-full px-3 py-3 placeholder-input focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            type="text"
            onChange={handleETHInputChange}
            onBlur={handleETHInputBlur}
            value={inputValueInETH}
            {...rest}
          />
        </div>

        <div className="flex flex-row items-center border shadow-sm rounded-r-md border-accent bg-gray-50">
          <input
            id={id}
            name={id}
            disabled={true}
            className="block w-full px-3 py-3 border border-transparent currency-input placeholder-input focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            value={valueInUSD}
          />
          <div className="flex flex-row items-center justify-center px-3 py-3 text-xs font-semibold border-l border-gray-200">
            USD
            {loading && (
              <ArrowPathIcon className="ml-1 w-[12px] text-primary animate-spin" />
            )}
          </div>
        </div>
      </div>
      {description && (
        <div className="block mt-2 text-xs text-left text-gray-500 text-thin">
          {description}
          <div className="mt-1">
            * The amount in USD is provided for your reference only and it can
            change to the moment of agreement termination.
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencyField
