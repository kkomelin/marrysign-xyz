import { ethers } from 'ethers'
import { toast } from 'react-toastify'
import { MARRYSIGN_ABI } from '../config/abi'

export const getAgreementCount = async () => {
  if (window.ethereum == null) {
    toast.error('Please sign in with your wallet first.')
    return
  }

  const provider = new ethers.providers.Web3Provider(
    window.ethereum as ethers.providers.ExternalProvider
  )

  if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS == null) {
    throw new Error('Please set contract address in your env config.')
  }

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const contract = new ethers.Contract(contractAddress, MARRYSIGN_ABI, provider)

  const value = await contract.getAgreementCount()
  return value.toNumber()
}

export const getAgreements = async () => {
  if (window.ethereum == null) {
    toast.error('Please sign in with your wallet first.')
    return
  }

  const provider = new ethers.providers.Web3Provider(
    window.ethereum as ethers.providers.ExternalProvider
  )

  if (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS == null) {
    throw new Error('Please set contract address in your env config.')
  }

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

  const contract = new ethers.Contract(contractAddress, MARRYSIGN_ABI, provider)

  return await contract.getAgreements()
}
