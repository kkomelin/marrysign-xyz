import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const FrontpageLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col items-center bg-left-top justify-center bg-pink-50 sm:bg-contain bg-auto bg-no-repeat bg-[1url('/images/backgrounds/frontpage/first-screen.jpg')]">
      <Meta>{meta}</Meta>
      <Header />
      <main className="w-full grow">{children}</main>
      <Footer />
    </div>
  )
}

export default FrontpageLayout
