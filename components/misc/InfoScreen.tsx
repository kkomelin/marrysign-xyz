import { FC } from 'react'
import { useAppContext } from '../hooks/useAppContext'
import AppLoader from './AppLoader'

type Props = {}
const InfoScreen: FC<Props> = () => {
  const { appLoading, appLoadingMessage } = useAppContext()

  if (!appLoading) {
    return <></>
  }

  return <AppLoader message={appLoadingMessage} />
}

export default InfoScreen
