import { useContext } from 'react'
import { IAppContext } from '../../types/IAppContext'
import { AppContext } from '../context/AppContext'

/**
 * Load app context.
 * It's just to not import types everytime we need the app context.
 *
 * @returns {IAppContext}
 */
export const useAppContext = (): IAppContext => {
  return useContext<IAppContext>(AppContext)
}
