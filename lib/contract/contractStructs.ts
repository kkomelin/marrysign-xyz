// Borrowed from https://github.com/ethers-io/ethers.js/discussions/2429#discussioncomment-3765296

// This is to remove unnecessary properties from the output type. Use it eg. `ExtractPropsFromArray<Inventory.ItemStructOutput>`
export type ExtractPropsFromArray<T> = Omit<
  T,
  keyof Array<unknown> | `${number}`
>

/**
 * Take an array returned by contract and convert it to JS object.
 */
export const contractStructToObject = <A extends Array<unknown>>(
  arr: A
): ExtractPropsFromArray<A> => {
  const keys = Object.keys(arr).filter((key) => isNaN(Number(key)))
  const result = {}
  // @ts-ignore
  arr.forEach((item, index) => (result[keys[index]] = item))
  return result as A
}
