import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const FrontpageLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen pt-6">
      <Meta>{meta}</Meta>
      <Header />
      <main className="flex flex-col items-center justify-center w-full px-8 py-12 text-center grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default FrontpageLayout
