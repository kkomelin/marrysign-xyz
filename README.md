# MarrySign (Frontend)
MarrySign app allows any couple to get married online.

This repository contains the front-end part of the project which is currently hosted on [Vercel](https://vercel.com/).

_The project is developed during [Chainlink Hackathon Fall 2022](https://hack.chain.link/) (Oct 14 - Nov 18, 2022)._

## Demo

[MarrySign.com](https://marrysign.com/) **(Goerli network only atm)**

## Chainlink Services Used

We receive agreement termination cost from user in USD and store it on chain in USD (see `Agreement.terminationCost` in [kkomelin/marrysign/contracts/MarrySign.sol](https://github.com/kkomelin/marrysign/contracts/MarrySign.sol) ), so Chainlink Price Feed is used to convert the termination cost to ETH on agreement termination in the `MarrySign.terminateAgreement()` function of the contract as well as on the front-end level.

A special [kkomelin/marrysign/contracts/CurrencyConverter.sol](https://github.com/kkomelin/marrysign/contracts/CurrencyConverter.sol) library is written to encapsulate currency conversion logic and communication with the Chainlink service.

On the front-end level, we display ETH equivalent of the USD amount on the Create Agreement, Accept Agreement and Terminate Agreement forms, which is obtained from Chainlink Price Feed in Web2 way. See [kkomelin/marrysign.com/lib/services/chainlink/index.ts](https://github.com/kkomelin/marrysign.com/lib/services/chainlink/index.ts)


## Development

```bash
npm run dev
# or
yarn dev
```
