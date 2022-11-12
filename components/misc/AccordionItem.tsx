import { Disclosure } from '@headlessui/react'
import c from 'clsx'
import { FC, PropsWithChildren } from 'react'

type Props = {
  title: string
  open: boolean
  className?: string
}
const AccordionItem: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  open = false,
  className,
}) => {
  return (
    <div className={c('w-full my-2 border rounded-t-md', className)}>
      <Disclosure defaultOpen={open}>
        <Disclosure.Button className="w-full p-2 font-semibold text-center border rounded-t-md">
          {title}
        </Disclosure.Button>
        <Disclosure.Panel className="flex flex-col items-center justify-center text-gray-500">
          {children}
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccordionItem
