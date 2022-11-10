import { Disclosure } from '@headlessui/react'
import { FC, PropsWithChildren } from 'react'

type Props = {
  title: string
  open: boolean
}
const AccordionItem: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  open = false,
}) => {
  return (
    <div className="w-full my-2 border rounded-t-md">
      <Disclosure defaultOpen={open}>
        <Disclosure.Button className="w-full p-2 font-semibold text-left border rounded-t-md">
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
