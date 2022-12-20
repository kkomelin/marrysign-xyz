import { BigNumber, BigNumberish, BytesLike, ethers } from 'ethers'
import { MarrySign__factory } from '../../../typechain'
import { ENetwork } from '../../../types/ENetwork'
import { hasEthereum, nowTimestamp, stringToHex } from '../../helpers'

export const getAgreementCount = async () => {
  _checkPrerequisites()

  const value = await (await _getContract()).getAgreementCount()
  return value.toNumber()
}

export const getAcceptedAgreements = async () => {
  _checkPrerequisitesContractAddress()

  return await (await _getContractAnonymously()).getAcceptedAgreements()
}

export const getAgreementByAddress = async (partnerAddress: string) => {
  _checkPrerequisites()

  return await (await _getContract()).getAgreementByAddress(partnerAddress)
}

export const getAgreementById = async (id: string) => {
  _checkPrerequisitesContractAddress()

  return await (await _getContractAnonymously()).getAgreement(id)
}

export const createAgreement = async (
  partner1Name: string,
  partner2Name: string,
  partner2Address: string,
  vow: string,
  terminationCost: BigNumber,
  onCreate?: (agreementId: BytesLike) => void
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
    contract.on('AgreementCreated', (agreementId: BytesLike) => {
      onCreate(agreementId)
    })
  }

  const receipt = await contract.createAgreement(
    partner2Address,
    content,
    terminationCost,
    createdAt
  )

  const result = await receipt.wait(1)

  return result.status === 1
}

export const acceptAgreement = async (
  id: string,
  onAccept?: (agreementId: BytesLike) => void
) => {
  _checkPrerequisites()

  const contract = await _getContract()

  if (onAccept) {
    contract.removeAllListeners('AgreementAccepted')
    contract.on('AgreementAccepted', (agreementId: BytesLike) => {
      onAccept(agreementId)
    })
  }

  const receipt = await contract.acceptAgreement(id, nowTimestamp())

  const result = await receipt.wait(1)

  return result.status === 1
}

export const refuseAgreement = async (
  id: string,
  onRefuse?: (agreementId: BytesLike) => void
) => {
  _checkPrerequisites()

  const contract = await _getContract()

  if (onRefuse) {
    contract.removeAllListeners('AgreementRefused')
    contract.on('AgreementRefused', (agreementId: BytesLike) => {
      onRefuse(agreementId)
    })
  }

  const receipt = await contract.refuseAgreement(id, nowTimestamp())

  const result = await receipt.wait(1)

  return result.status === 1
}

export const terminateAgreement = async (
  id: string,
  terminationCost: BigNumberish,
  onTerminate?: (agreementId: BytesLike) => void
) => {
  _checkPrerequisites()

  const contract = await _getContract()

  if (onTerminate) {
    contract.removeAllListeners('AgreementTerminated')
    contract.on('AgreementTerminated', (agreementId: BytesLike) => {
      onTerminate(agreementId)
    })
  }

  const receipt = await contract.terminateAgreement(id, {
    value: terminationCost,
  })

  const result = await receipt.wait(1)

  return result.status === 1
}

const _getNetworkRpcUrl = () => {
  const network = process.env.NEXT_PUBLIC_CURRENT_NETWORK || ENetwork.Local

  switch (network) {
    case ENetwork.Goerli:
      return (
        process.env.NEXT_PUBLIC_GOERLI_RPC_URL ||
        'https://eth-goerli.alchemyapi.io/v2/your-api-key'
      )
    case ENetwork.Local:
    default:
      return undefined
  }
}

/**
 * Get contract but not ask user to connect.
 * @returns
 */
const _getContractAnonymously = async () => {
  const contractAddress =
    process.env.NEXT_PUBLIC_MARRYSIGN_CONTRACT_ADDRESS || ''

  const rpcUrl = _getNetworkRpcUrl()

  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)

  const contract = new ethers.Contract(
    contractAddress,
    MarrySign__factory.abi,
    provider
  )

  return contract
}

/**
 * Get contract and ask user to connect.
 *
 * @returns
 */
const _getContract = async () => {
  const contractAddress =
    process.env.NEXT_PUBLIC_MARRYSIGN_CONTRACT_ADDRESS || ''

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

const _checkPrerequisitesWalletConnected = () => {
  if (!hasEthereum()) {
    throw new Error('Please sign in with your wallet first.')
  }
}

const _checkPrerequisitesContractAddress = () => {
  if (process.env.NEXT_PUBLIC_MARRYSIGN_CONTRACT_ADDRESS == null) {
    throw new Error('Please set contract address in your env config.')
  }
}

const _checkPrerequisites = () => {
  _checkPrerequisitesWalletConnected()
  _checkPrerequisitesContractAddress()
}
