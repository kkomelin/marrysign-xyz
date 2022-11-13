import { Disclosure } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import c from 'clsx'
import { FC, MouseEvent, PropsWithChildren } from 'react'

type Props = {
  title: string
  defaultOpen: boolean
  className?: string
  completed?: boolean
}
const AccordionItem: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  defaultOpen = false,
  className,
  completed = false,
}) => {
  return (
    <div className={c('my-4', className)}>
      <Disclosure defaultOpen={defaultOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={c(
                'w-full px-5 py-3 text-base font-bold leading-5 text-primary text-left flex flex-row items-center justify-between bg-white shadow',
                open && !completed
                  ? 'border-t-primary border-r-primary border-l-primary outline-none border rounded-t-lg'
                  : 'border border-primary rounded-lg'
              )}
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                if (completed) {
                  e.preventDefault()
                }
              }}
            >
              {title}
              {completed && (
                <CheckCircleIcon className="w-7 ui-open:rotate-90 ui-open:transform" />
              )}
            </Disclosure.Button>
            {defaultOpen && !completed && (
              <Disclosure.Panel className="flex flex-col items-center justify-center bg-white border rounded-b-lg outline-none border-b-primary border-r-primary border-l-primary">
                {children}
              </Disclosure.Panel>
            )}
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default AccordionItem
