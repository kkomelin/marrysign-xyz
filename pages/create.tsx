import CheckIcon from '@mui/icons-material/Check'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import LoginIcon from '@mui/icons-material/Login'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel, { StepLabelClasses } from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import { BytesLike } from 'ethers'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAccount } from 'wagmi'
import AgreementShareBlock from '../components/blocks/AgreementShareBlock'
import ButtonLink from '../components/controls/ButtonLink'
import ConnectButton from '../components/controls/ConnectButton'
import CreateAgreementForm from '../components/forms/CreateAgreementForm'
import { useAppContext } from '../components/hooks/useAppContext'
import MainLayout from '../components/layouts/MainLayout'
import { agreementPath } from '../lib/helpers'
import { EAgreementState } from '../types/EAgreementState'

const WizardPage: NextPage = () => {
  const { isDisconnected, isConnected, address } = useAccount()
  const { userAgreement, enableForceLoadUserAgreement } = useAppContext()
  const [activeStep, setActiveStep] = useState(0)

  const handleAgreementCreated = (agreementId: BytesLike) => {
    toast(
      'Congrats! Your agreement has been created. Time to send it to your loved one.'
    )

    enableForceLoadUserAgreement()

    // router.push(agreementPath(agreement.id as BytesLike))
  }

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  // }

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  useEffect(() => {
    if (isDisconnected) {
      setActiveStep(0)
    } else {
      if (userAgreement == null) {
        setActiveStep(1)
      } else {
        setActiveStep(2)
      }
    }
  }, [isDisconnected, userAgreement])

  return (
    <MainLayout>
      <div className="flex flex-col w-full">
        <h2 className="mt-2 mb-10 text-3xl font-light leading-10 text-center text-secondary">
          Create your crypto-agreement
        </h2>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="my-8"
        >
          <Step key={0}>
            <StepLabel
              classes={stepLebelClasses(activeStep === 0, activeStep > 0)}
              StepIconComponent={activeStep > 0 ? CheckIcon : LoginIcon}
            >
              Login with your wallet
            </StepLabel>
            <StepContent>
              {isDisconnected && (
                <div className="my-6">
                  <ConnectButton />
                </div>
              )}
            </StepContent>
          </Step>

          <Step key={1}>
            <StepLabel
              StepIconComponent={activeStep > 1 ? CheckIcon : NoteAddIcon}
              classes={stepLebelClasses(activeStep === 1, activeStep > 1)}
            >
              Create your agreement
            </StepLabel>
            <StepContent>
              {isConnected && userAgreement == null && (
                <CreateAgreementForm
                  onAgreementCreated={handleAgreementCreated}
                />
              )}
            </StepContent>
          </Step>

          <Step key={2}>
            <StepLabel
              StepIconComponent={
                activeStep > 2 ? CheckIcon : ForwardToInboxIcon
              }
              classes={stepLebelClasses(activeStep === 2, activeStep > 2)}
            >
              Invite your partner
            </StepLabel>
            <StepContent>
              {userAgreement != null &&
                userAgreement.state == EAgreementState.Created &&
                userAgreement.alice === address && (
                  <div className="flex flex-col">
                    <AgreementShareBlock agreement={userAgreement} />
                    <ButtonLink
                      className="max-w-min"
                      href={agreementPath(userAgreement.id as BytesLike)}
                    >
                      Done
                    </ButtonLink>
                  </div>
                )}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    </MainLayout>
  )
}

export default WizardPage

const stepLebelClasses = (
  active: boolean,
  completed: boolean
): Partial<StepLabelClasses> => {
  return {
    label: '!text-lg !font-sans ' + (completed ? '!text-purple-300' : '!text-primary'),
    active: active ? '!font-semibold ' : '',
    iconContainer:
      '!pr-0 !mr-3 !rounded-full !w-10 !shadow-sm !h-10 !flex !flex-col !justify-center !items-center ' +
      (active || completed
        ? '!bg-purple-400 !bg-opacity-90 !text-white'
        : '!bg-white !text-primary'),
  }
}
