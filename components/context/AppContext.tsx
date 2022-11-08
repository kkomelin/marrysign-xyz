import { createContext } from 'react'
import { IAppContext } from '../../types/IAppContext'

export const AppContext = createContext<IAppContext>({
  userAgreement: null,
  setUserAgreement: () => {},
})

export const AppContextProvider = AppContext.Provider
export const AppContextConsumer = AppContext.Consumer
