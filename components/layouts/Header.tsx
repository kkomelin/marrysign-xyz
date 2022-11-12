import { BytesLike } from 'ethers'
import Link from 'next/link'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { APP_NAME } from '../../lib/config'
import { agreementPath } from '../../lib/helpers'
import { EAgreementState } from '../../types/EAgreementState'
import ButtonLink from '../controls/ButtonLink'
import ConnectButton from '../controls/ConnectButton'
import { useAppContext } from '../hooks/useAppContext'
import AgreementStateVisualization from '../misc/AgreementStateVisualization'

type Props = {}

const Header: FC<Props> = () => {
  const { isDisconnected, isConnected } = useAccount()
  const { userAgreement } = useAppContext()

  return (
    <header className="flex flex-row items-center justify-between w-full p-3">
      <h1>
        <Link
          href="/"
          className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          {APP_NAME}
        </Link>
      </h1>

      <div className="flex flex-row items-center gap-3">
        <nav className="flex flex-row">
          <ul>
            <li>
              <a className="text-lg" href="#how-it-works">
                How it Works
              </a>
            </li>
          </ul>
        </nav>

        {isDisconnected && <ConnectButton />}
        {isConnected && (
          <ButtonLink
            href={
              userAgreement
                ? agreementPath(userAgreement.id as BytesLike)
                : '/create'
            }
            className="mt-0"
          >
            <span className="flex flex-row gap-2">
              <span className=" whitespace-nowrap">
                {userAgreement ? 'My agreement' : 'Create agreement'}
              </span>
              <AgreementStateVisualization
                state={userAgreement?.state as EAgreementState}
                className="w-[20px]"
              />
            </span>
          </ButtonLink>
        )}
      </div>
    </header>
  )
}

export default Header
