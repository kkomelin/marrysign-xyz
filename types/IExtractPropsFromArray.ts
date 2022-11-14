/**
 * This is to remove unnecessary properties from the output type. Use it eg. `IExtractPropsFromArray<Inventory.ItemStructOutput>`
 * Borrowed from https://github.com/ethers-io/ethers.js/discussions/2429#discussioncomment-3765296
 */
export type IExtractPropsFromArray<T> = Omit<
  T,
  keyof Array<unknown> | `${number}`
>
