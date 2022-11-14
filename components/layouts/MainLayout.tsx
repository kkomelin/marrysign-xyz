import { FC, PropsWithChildren } from 'react'
import Meta from '../misc/Meta'
import Footer from './Footer'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const MainLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col h-screen">
      <Meta>{meta}</Meta>
      <Header />
      <main className="flex flex-col items-center justify-between w-full max-w-xl px-5 py-8 mx-auto sm:p-10 grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
