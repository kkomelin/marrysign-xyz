import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const MainLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="bg-pink-50 ">
      <Meta>{meta}</Meta>
      <Header />
      <main className="flex flex-col items-center justify-between mx-auto flex-grow-1 ">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
