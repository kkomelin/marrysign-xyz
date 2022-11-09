import { createContext } from 'react'
import { IAppContext } from '../../types/IAppContext'

export const AppContext = createContext<IAppContext>({
  userAgreement: null,
  setUserAgreement: () => {},
  isForceLoadUserAgreementEnabled: false,
  enableForceLoadUserAgreement: () => {},
  disableForceLoadUserAgreement: () => {},

  appLoading: true,
  setAppLoading: () => {},
})

export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer
