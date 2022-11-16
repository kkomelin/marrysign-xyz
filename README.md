# MarrySign (Frontend)
MarrySign app allows any couple to get married online.

## Demo

[MarrySign.com](https://marrysign.com/) **(Goerli network only atm)**


## Chainlink Services Used

We store agreement termination cost in USD on blockchain.
To display ETH equivalent to the USD amount on the Agreement Create and Agrement Accept forms, 
we use Chainlink DataFeeds in Web2 way. See [/lib/services/chainlink/index.ts](/lib/services/chainlink/index.ts)

TBC


## Development

```bash
npm run dev
# or
yarn dev
```
