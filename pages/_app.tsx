import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContextProvider } from '../components/context/AppContext'
import AuthProvider from '../components/providers/AuthProvider'
import UserAgreementProvider from '../components/providers/UserAgreementProvider'
import '../styles/globals.css'
import { MarrySign } from '../typechain'
import { IAppContext } from '../types/IAppContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [userAgreement, setUserAgreement] =
    useState<MarrySign.AgreementStruct | null>(null)
  const [appLoading, setAppLoading] = useState<boolean>(true)
  const [isForceLoadUserAgreementEnabled, setIsForceLoadUserAgreementEnabled] = useState<boolean>(false)

  const enableForceLoadUserAgreement = () => {
    setIsForceLoadUserAgreementEnabled(true)
  }
  const disableForceLoadUserAgreement = () => {
    setIsForceLoadUserAgreementEnabled(false)
  }

  const appContext: IAppContext = {
    userAgreement,
    setUserAgreement,
    isForceLoadUserAgreementEnabled,
    enableForceLoadUserAgreement,
    disableForceLoadUserAgreement,
    appLoading,
    setAppLoading,
  }

  return (
    <AuthProvider>
      <AppContextProvider value={appContext}>
        <UserAgreementProvider>
          <Component {...pageProps} />
          <ToastContainer hideProgressBar={true} />
        </UserAgreementProvider>
      </AppContextProvider>
    </AuthProvider>
  )
}

export default MyApp
