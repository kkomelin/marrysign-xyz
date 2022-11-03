import { ethers } from 'ethers'
import { MarrySign__factory } from '../../typechain'
import { hasEthereum, nowTimestamp, stringToHex } from '../helpers'

export const getAgreementCount = async () => {
  _checkPrerequisites()

  const value = await (await _getContract()).getAgreementCount()
  return value.toNumber()
}

export const getAcceptedAgreements = async () => {
  _checkPrerequisites()

  return await(await _getContract()).getAcceptedAgreements()
}

export const createAgreement = async (
  partner1Name: string,
  partner2Name: string,
  partner2Address: string,
  vow: string,
  terminationCost: number,
  onCreate?: (agreementId: number) => void
) => {
  _checkPrerequisites()

  const createdAt = nowTimestamp()
  const agreementData = {
    partner1: {
      name: partner1Name,
    },
    partner2: {
      name: partner2Name,
    },
    vow,
  }

  const content = stringToHex(JSON.stringify(agreementData))

  const contract = await _getContract()

  if (onCreate) {
    contract.removeAllListeners('AgreementCreated')
    contract.on('AgreementCreated', (result) => {
      onCreate(result.toNumber())
    })
  }

  const receipt = await(await _getContract()).createAgreement(
    partner2Address,
    content,
    terminationCost,
    createdAt
  )

  const result = await receipt.wait()

  return result.status === 1
}

const _getContract = async () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

  const provider = new ethers.providers.Web3Provider(
    window.ethereum as ethers.providers.ExternalProvider
  )

  await provider.send('eth_requestAccounts', [])

  const signer = provider.getSigner()

  const contract = new ethers.Contract(
    contractAddress,
    MarrySign__factory.abi,
    signer
  )

  return contract
}

const _checkPrerequisites = () => {
  if (!hasEthereum()) {
    throw new Error('Please sign in with your wallet first.')
  }

  if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS == null) {
    throw new Error('Please set contract address in your env config.')
  }
}
