import { MarrySign } from '../typechain'

export type IAppContext = {
  userAgreement: MarrySign.AgreementStruct | null
  setUserAgreement: (user: MarrySign.AgreementStruct | null) => void
  isForceLoadUserAgreementEnabled: boolean
  enableForceLoadUserAgreement: () => void
  disableForceLoadUserAgreement: () => void

  appLoading: boolean
  appLoadingMessage?: string
  showAppLoading: (message?: string) => void
  hideAppLoading: () => void
}
