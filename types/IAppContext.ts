import { MarrySign } from '../typechain'

export type IAppContext = {
  userAgreement: MarrySign.AgreementStruct | null
  setUserAgreement: (user: MarrySign.AgreementStruct) => void
}
