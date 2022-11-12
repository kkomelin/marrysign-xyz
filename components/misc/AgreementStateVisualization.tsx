import { FC } from 'react'
import AcceptedStateIcon from '../../public/images/states/accepted.svg'
import CreatedStateIcon from '../../public/images/states/created.svg'
import DefaultStateIcon from '../../public/images/states/default.svg'
import RefusedStateIcon from '../../public/images/states/refused.svg'
import { EAgreementState } from '../../types/EAgreementState'

type Props = {
  state?: EAgreementState
  className?: string
}
const AgreementStateVisualization: FC<Props> = ({ state, className }) => {
  const props = {
    className,
  }

  switch (state) {
    case EAgreementState.Created:
      return <CreatedStateIcon {...props} />
    case EAgreementState.Accepted:
      return <AcceptedStateIcon {...props} />
    case EAgreementState.Refused:
      return <RefusedStateIcon {...props} />
    default:
      return <DefaultStateIcon {...props} />
  }
}

export default AgreementStateVisualization
