import { BytesLike } from 'ethers'
import Link from 'next/link'
import { FC } from 'react'
import { useAccount } from 'wagmi'
import { APP_NAME, IS_DISCONTINUED } from '../../lib/config'
import { agreementPath, isStagingProd } from '../../lib/helpers'
import { EAgreementState } from '../../types/EAgreementState'
import ButtonLink from '../controls/ButtonLink'
import ConnectButton from '../controls/ConnectButton'
import { useAppContext } from '../hooks/useAppContext'
import AgreementStateVisualization from '../misc/AgreementStateVisualization'
import DiscontinuedTopBar from '../misc/DiscontinuedTopBar'
import StagingTopBar from '../misc/StagingTopBar'

type Props = {}
const Header: FC<Props> = () => {
  const { isDisconnected, isConnected } = useAccount()
  const { userAgreement } = useAppContext()

  return (
    <>
      {isStagingProd() && <StagingTopBar />}
      {IS_DISCONTINUED && <DiscontinuedTopBar />}
      <header className="flex flex-row flex-wrap items-center justify-between w-full gap-5 px-6 py-6">
        <h1 className="relative order-1 ">
          <Link
            href="/"
            className="text-3xl font-extrabold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {APP_NAME}
          </Link>
          <div className="absolute text-sm font-thin -right-3 -top-2">beta</div>
        </h1>

        <div className="order-2 sm:order-3">
          {isDisconnected && <ConnectButton />}
          {isConnected && (
            <ButtonLink
              href={
                userAgreement
                  ? agreementPath(userAgreement.id as BytesLike)
                  : '/create'
              }
              className="!mt-0"
            >
              <span className="flex flex-row items-center gap-2">
                <span className="text-sm sm:text-md whitespace-nowrap">
                  {userAgreement ? (
                    <>
                      My <span className="hidden sm:inline">agreement</span>
                    </>
                  ) : (
                    <>
                      Create <span className="hidden sm:inline">agreement</span>
                    </>
                  )}
                </span>
                <AgreementStateVisualization
                  state={userAgreement?.state as EAgreementState}
                  className="w-[20px]"
                />
              </span>
            </ButtonLink>
          )}
        </div>

        <nav className="flex flex-row flex-wrap justify-start order-3 w-full md:text-lg sm:justify-end sm:order-2 grow sm:w-0">
          <ul>
            <li className="inline mr-2 md:mr-3">
              <Link className="py-1" href="/#about">
                About
              </Link>
            </li>
            <li className="inline ml-2 mr-2 md:ml-3 md:mr-3">
              <Link className="py-1" href="/#how-it-works">
                How it Works
              </Link>
            </li>
            <li className="inline ml-2 mr-2 md:ml-3 md:mr-3">
              <Link className="py-1" href="/#pricing">
                Pricing
              </Link>
            </li>
            <li className="inline ml-2 mr-2 md:ml-3 md:mr-3">
              <Link className="py-1" href="/#faq">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header
