export type IAgreementParty = {
  name: string
}

export type IAgreementContent = {
  partner1: IAgreementParty
  partner2: IAgreementParty
  vow: string
}
