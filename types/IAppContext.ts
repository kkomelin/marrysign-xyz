import { MarrySign } from '../typechain'

export type IAppContext = {
  userAgreement: MarrySign.AgreementStruct | null
  setUserAgreement: (user: MarrySign.AgreementStruct | null) => void
  isForceLoadUserAgreementEnabled: boolean
  enableForceLoadUserAgreement: () => void
  disableForceLoadUserAgreement: () => void
  
  appLoading: boolean
  setAppLoading: (newState: boolean) => void
}
