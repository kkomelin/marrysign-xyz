import { FC } from 'react'
import AcceptedStatusIcon from '../../public/images/states/accepted.svg'
import CancelledStatusIcon from '../../public/images/states/cancelled.svg'
import CreatedStatusIcon from '../../public/images/states/created.svg'
import { EAgreementState } from '../../types/EAgreementState'

type Props = {
  state: EAgreementState
  className?: string
}
const AgreementStateVisualization: FC<Props> = ({ state, className }) => {
  const props = {
    className,
  }
  
  switch (state) {
    case EAgreementState.Created:
      return <CreatedStatusIcon {...props} />
    case EAgreementState.Accepted:
      return <AcceptedStatusIcon {...props} />
    case EAgreementState.Refused:
    default:
      return <CancelledStatusIcon {...props} />
  }
}

export default AgreementStateVisualization
