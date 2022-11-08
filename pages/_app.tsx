import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContextProvider } from '../components/context/AppContext'
import AuthProvider from '../components/providers/AuthProvider'
import '../styles/globals.css'
import { MarrySign } from '../typechain'
import { IAppContext } from '../types/IAppContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [userAgreement, setUserAgreement] =
    useState<MarrySign.AgreementStruct | null>(null)

  const appContext: IAppContext = {
    userAgreement,
    setUserAgreement,
  }

  return (
    <AuthProvider>
      <AppContextProvider value={appContext}>
        <Component {...pageProps} />
        <ToastContainer hideProgressBar={true} />
      </AppContextProvider>
    </AuthProvider>
  )
}

export default MyApp
