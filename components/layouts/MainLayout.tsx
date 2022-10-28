import { FC, PropsWithChildren } from 'react'
import Meta from '../common/Meta'
import Header from './Header'

type Props = {
  meta?: React.ReactNode
}

const MainLayout: FC<PropsWithChildren<Props>> = ({ children, meta }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-tertiary">
      <Meta>{meta}</Meta>
      <Header />
      <main className="flex flex-col items-center justify-between mx-auto flex-grow-1 bg-j-primary">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
