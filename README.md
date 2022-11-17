# MarrySign (Frontend)
MarrySign app allows any couple to get married online.

This repository contains the front-end part of the project which is developed with Typescript, Next.js, React and TailwindCSS, and currently hosted on Vercel.

_The project is developed during [Chainlink Hackathon Fall 2022](https://hack.chain.link/) (Oct 14 - Nov 18, 2022)._

## Demo

[MarrySign.com](https://marrysign.com/) (Goerli network)

## Backend Part

[kkomelin/marrysign](https://github.com/kkomelin/marrysign)

## Chainlink Services Used

We receive agreement termination cost from user in USD and store it on chain in USD (see `Agreement.terminationCost` in [kkomelin/marrysign/contracts/MarrySign.sol](https://github.com/kkomelin/marrysign/blob/main/contracts/MarrySign.sol) ), so Chainlink Price Feed is used to convert the termination cost to ETH on agreement termination in the `MarrySign.terminateAgreement()` function of the contract as well as on the front-end level.

A special [kkomelin/marrysign/contracts/CurrencyConverter.sol](https://github.com/kkomelin/marrysign/blob/main/contracts/CurrencyConverter.sol) library is developed to encapsulate currency conversion logic and communication with the Chainlink service.

On the front-end level, we display ETH equivalent of the USD amount on the Create Agreement, Accept Agreement and Terminate Agreement forms, which is obtained from Chainlink Price Feed in Web2 way. See [kkomelin/marrysign-com/lib/services/chainlink/index.ts](https://github.com/kkomelin/marrysign-com/blob/main/lib/services/chainlink/index.ts)


## Installation

```bash
yarn install || npm install
```

## Configuration

See [kkomelin/marrysign-com/.example.env](https://github.com/kkomelin/marrysign-com/blob/main/.example.env) for reference.

Copy `.example.env` to `.env` and update the variables with your values.

## Development

```bash
yarn dev || npm run dev
```
## Bugs, Typos and Suggestions

You're very welcome with your bug reports and suggestions here in the [issue queue](https://github.com/kkomelin/marrysign-com/issues/new), or just drop [Konstantin](https://github.com/kkomelin) a line on Twitter [@kkomelin](https://twitter.com/kkomelin).
