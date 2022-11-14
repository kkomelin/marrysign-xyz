import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const FrontpageLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col items-center bg-[15%_-8%] sm:bg-left-top justify-center bg-content bg-no-repeat bg-[url('/images/frontpage/bg.svg')]">
      <Meta>{meta}</Meta>
      <Header />
      <main className="w-full grow">{children}</main>
      <Footer />
    </div>
  )
}

export default FrontpageLayout
