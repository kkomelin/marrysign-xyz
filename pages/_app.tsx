import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContextProvider } from '../components/context/AppContext'
import InfoScreen from '../components/misc/InfoScreen'
import AuthProvider from '../components/providers/AuthProvider'
import UserAgreementProvider from '../components/providers/UserAgreementProvider'
import '../styles/globals.css'
import { MarrySign } from '../typechain'
import { IAppContext } from '../types/IAppContext'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [userAgreement, setUserAgreement] =
    useState<MarrySign.AgreementStruct | null>(null)
  const [appLoading, setAppLoading] = useState<boolean>(false)
  const [appLoadingMessage, setAppLoadingMessage] = useState<
    string | undefined
  >(undefined)
  const [isForceLoadUserAgreementEnabled, setIsForceLoadUserAgreementEnabled] =
    useState<boolean>(false)

  const enableForceLoadUserAgreement = () => {
    setIsForceLoadUserAgreementEnabled(true)
  }
  const disableForceLoadUserAgreement = () => {
    setIsForceLoadUserAgreementEnabled(false)
  }

  const showAppLoading = (message?: string) => {
    setAppLoading(true)
    setAppLoadingMessage(message)
  }

  const hideAppLoading = () => {
    setAppLoading(false)
  }

  const appContext: IAppContext = {
    userAgreement,
    setUserAgreement,
    isForceLoadUserAgreementEnabled,
    enableForceLoadUserAgreement,
    disableForceLoadUserAgreement,
    appLoading,
    appLoadingMessage,
    showAppLoading,
    hideAppLoading,
  }

  return (
    <AuthProvider>
      <AppContextProvider value={appContext}>
        <UserAgreementProvider>
          <Component {...pageProps} />
          <ToastContainer hideProgressBar={true} pauseOnHover={true} />
          <InfoScreen />
        </UserAgreementProvider>
      </AppContextProvider>
    </AuthProvider>
  )
}

export default MyApp
