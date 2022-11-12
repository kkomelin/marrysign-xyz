import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const FrontpageLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Meta>{meta}</Meta>
      <Header />
      <main className="w-full py-12 grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default FrontpageLayout
