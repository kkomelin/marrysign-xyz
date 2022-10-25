/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { MarrySign, MarrySignInterface } from "../MarrySign";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AccessDenied",
    type: "error",
  },
  {
    inputs: [],
    name: "BobNotSpecified",
    type: "error",
  },
  {
    inputs: [],
    name: "CallerIsNotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "EmptyContent",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidAgreementId",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTimestamp",
    type: "error",
  },
  {
    inputs: [],
    name: "MustPayExactTerminationCost",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroTerminationCost",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "AgreementAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "AgreementCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "AgreementRefused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "AgreementTerminated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "acceptedAt",
        type: "uint256",
      },
    ],
    name: "acceptAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bob",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "content",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "terminationCost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "createdAt",
        type: "uint256",
      },
    ],
    name: "createAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getAgreement",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "alice",
            type: "address",
          },
          {
            internalType: "address",
            name: "bob",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "content",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "terminationCost",
            type: "uint256",
          },
          {
            internalType: "enum MarrySign.AgreementState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct MarrySign.Agreement",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAgreementCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAgreements",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "alice",
            type: "address",
          },
          {
            internalType: "address",
            name: "bob",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "content",
            type: "bytes",
          },
          {
            internalType: "uint256",
            name: "terminationCost",
            type: "uint256",
          },
          {
            internalType: "enum MarrySign.AgreementState",
            name: "state",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "updatedAt",
            type: "uint256",
          },
        ],
        internalType: "struct MarrySign.Agreement[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "refusedAt",
        type: "uint256",
      },
    ],
    name: "refuseAgreement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "terminateAgreement",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550611eb1806100536000396000f3fe6080604052600436106100795760003560e01c80637c855d3c1161004e5780637c855d3c146101265780639a0269241461014f578063c9d51dd01461016b578063cf7e92421461019457610079565b8062176ed71461007e5780628bed3e146100a75780633ccfd60b146100d25780634f9f6fe6146100e9575b600080fd5b34801561008a57600080fd5b506100a560048036038101906100a0919061147f565b6101bf565b005b3480156100b357600080fd5b506100bc6103ba565b6040516100c991906114ce565b60405180910390f35b3480156100de57600080fd5b506100e76103c7565b005b3480156100f557600080fd5b50610110600480360381019061010b91906114e9565b6104b5565b60405161011d91906116f6565b60405180910390f35b34801561013257600080fd5b5061014d6004803603810190610148919061147f565b6106be565b005b610169600480360381019061016491906114e9565b610939565b005b34801561017757600080fd5b50610192600480360381019061018d9190611879565b610e67565b005b3480156101a057600080fd5b506101a9611178565b6040516101b69190611a47565b60405180910390f35b8060008114806101ce57504281115b806101e6575062015180426101e39190611a98565b81105b1561021d576040517fb7d0949700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6102256103ba565b831061025d576040517f6bb2419e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001838154811061027157610270611acc565b5b906000526020600020906006020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610307576040517f4ca8886700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600180848154811061031c5761031b611acc565b5b906000526020600020906006020160040160006101000a81548160ff0219169083600381111561034f5761034e6115f6565b5b0217905550816001848154811061036957610368611acc565b5b9060005260206000209060060201600501819055507fe2143037af5c22b6c0cd4e6e32f4ebf9e45a47c761e704d3d5e45e0c656b13a4836040516103ad91906114ce565b60405180910390a1505050565b6000600180549050905090565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461044c576040517f6db2465f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f193505050501580156104b2573d6000803e3d6000fd5b50565b6104bd611364565b6104c56103ba565b82106104fd576040517f6bb2419e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6001828154811061051157610510611acc565b5b90600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820180546105e690611b2a565b80601f016020809104026020016040519081016040528092919081815260200182805461061290611b2a565b801561065f5780601f106106345761010080835404028352916020019161065f565b820191906000526020600020905b81548152906001019060200180831161064257829003601f168201915b50505050508152602001600382015481526020016004820160009054906101000a900460ff166003811115610697576106966115f6565b5b60038111156106a9576106a86115f6565b5b81526020016005820154815250509050919050565b8060008114806106cd57504281115b806106e5575062015180426106e29190611a98565b81105b1561071c576040517fb7d0949700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107246103ba565b831061075c576040517f6bb2419e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166001848154811061078757610786611acc565b5b906000526020600020906006020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561084e57503373ffffffffffffffffffffffffffffffffffffffff166001848154811061080357610802611acc565b5b906000526020600020906006020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15610885576040517f4ca8886700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60026001848154811061089b5761089a611acc565b5b906000526020600020906006020160040160006101000a81548160ff021916908360038111156108ce576108cd6115f6565b5b021790555081600184815481106108e8576108e7611acc565b5b9060005260206000209060060201600501819055507fb8109a0b81afab35d75ebc581e5d538fa91872a85354c28d2c84e4bdcfb63ab38360405161092c91906114ce565b60405180910390a1505050565b6109416103ba565b8110610979576040517f6bb2419e00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16600182815481106109a4576109a3611acc565b5b906000526020600020906006020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614158015610a6b57503373ffffffffffffffffffffffffffffffffffffffff1660018281548110610a2057610a1f611acc565b5b906000526020600020906006020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b15610aa2576040517f4ca8886700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60018181548110610ab657610ab5611acc565b5b9060005260206000209060060201600301543414610b00576040517f9602d60700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006064600a60ff1634610b149190611b5b565b610b1e9190611bcc565b905060008114610b905760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610b8e573d6000803e3d6000fd5b505b60008134610b9e9190611a98565b90503373ffffffffffffffffffffffffffffffffffffffff1660018481548110610bcb57610bca611acc565b5b906000526020600020906006020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610ca95760018381548110610c2c57610c2b611acc565b5b906000526020600020906006020160010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610ca3573d6000803e3d6000fd5b50610d36565b60018381548110610cbd57610cbc611acc565b5b906000526020600020906006020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610d34573d6000803e3d6000fd5b505b60018381548110610d4a57610d49611acc565b5b9060005260206000209060060201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600282016000610db791906113d8565b60038201600090556004820160006101000a81549060ff021916905560058201600090555050600360018481548110610df357610df2611acc565b5b906000526020600020906006020160040160006101000a81548160ff02191690836003811115610e2657610e256115f6565b5b02179055507ff9fa90295ce96d59953324ed394a72b2cc720230958f611004a030e5f081d59183604051610e5a91906114ce565b60405180910390a1505050565b806000811480610e7657504281115b80610e8e57506201518042610e8b9190611a98565b81105b15610ec5576040517fb7d0949700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000845103610f00576040517f68b3703600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1603610f66576040517fd62e497b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60008303610fa0576040517ff6d5173800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018773ffffffffffffffffffffffffffffffffffffffff16815260200186815260200185815260200160006003811115611005576110046115f6565b5b8152602001848152509050600181908060018154018082558091505060019003906000526020600020906006020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190816110df9190611da9565b506060820151816003015560808201518160040160006101000a81548160ff02191690836003811115611115576111146115f6565b5b021790555060a0820151816005015550507ff274198eb9b32eaaabc5696e6d9b096304df666d0d3dbbf19bce40387f83df0560016111516103ba565b61115b9190611a98565b60405161116891906114ce565b60405180910390a1505050505050565b60606001805480602002602001604051908101604052809291908181526020016000905b8282101561135b57838290600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201805461127b90611b2a565b80601f01602080910402602001604051908101604052809291908181526020018280546112a790611b2a565b80156112f45780601f106112c9576101008083540402835291602001916112f4565b820191906000526020600020905b8154815290600101906020018083116112d757829003601f168201915b50505050508152602001600382015481526020016004820160009054906101000a900460ff16600381111561132c5761132b6115f6565b5b600381111561133e5761133d6115f6565b5b81526020016005820154815250508152602001906001019061119c565b50505050905090565b6040518060c00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016060815260200160008152602001600060038111156113cb576113ca6115f6565b5b8152602001600081525090565b5080546113e490611b2a565b6000825580601f106113f65750611415565b601f0160209004906000526020600020908101906114149190611418565b5b50565b5b80821115611431576000816000905550600101611419565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61145c81611449565b811461146757600080fd5b50565b60008135905061147981611453565b92915050565b600080604083850312156114965761149561143f565b5b60006114a48582860161146a565b92505060206114b58582860161146a565b9150509250929050565b6114c881611449565b82525050565b60006020820190506114e360008301846114bf565b92915050565b6000602082840312156114ff576114fe61143f565b5b600061150d8482850161146a565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061154182611516565b9050919050565b61155181611536565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611591578082015181840152602081019050611576565b60008484015250505050565b6000601f19601f8301169050919050565b60006115b982611557565b6115c38185611562565b93506115d3818560208601611573565b6115dc8161159d565b840191505092915050565b6115f081611449565b82525050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60048110611636576116356115f6565b5b50565b600081905061164782611625565b919050565b600061165782611639565b9050919050565b6116678161164c565b82525050565b600060c0830160008301516116856000860182611548565b5060208301516116986020860182611548565b50604083015184820360408601526116b082826115ae565b91505060608301516116c560608601826115e7565b5060808301516116d8608086018261165e565b5060a08301516116eb60a08601826115e7565b508091505092915050565b60006020820190508181036000830152611710818461166d565b905092915050565b61172181611536565b811461172c57600080fd5b50565b60008135905061173e81611718565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6117868261159d565b810181811067ffffffffffffffff821117156117a5576117a461174e565b5b80604052505050565b60006117b8611435565b90506117c4828261177d565b919050565b600067ffffffffffffffff8211156117e4576117e361174e565b5b6117ed8261159d565b9050602081019050919050565b82818337600083830152505050565b600061181c611817846117c9565b6117ae565b90508281526020810184848401111561183857611837611749565b5b6118438482856117fa565b509392505050565b600082601f8301126118605761185f611744565b5b8135611870848260208601611809565b91505092915050565b600080600080608085870312156118935761189261143f565b5b60006118a18782880161172f565b945050602085013567ffffffffffffffff8111156118c2576118c1611444565b5b6118ce8782880161184b565b93505060406118df8782880161146a565b92505060606118f08782880161146a565b91505092959194509250565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600060c0830160008301516119406000860182611548565b5060208301516119536020860182611548565b506040830151848203604086015261196b82826115ae565b915050606083015161198060608601826115e7565b506080830151611993608086018261165e565b5060a08301516119a660a08601826115e7565b508091505092915050565b60006119bd8383611928565b905092915050565b6000602082019050919050565b60006119dd826118fc565b6119e78185611907565b9350836020820285016119f985611918565b8060005b85811015611a355784840389528151611a1685826119b1565b9450611a21836119c5565b925060208a019950506001810190506119fd565b50829750879550505050505092915050565b60006020820190508181036000830152611a6181846119d2565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611aa382611449565b9150611aae83611449565b9250828203905081811115611ac657611ac5611a69565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611b4257607f821691505b602082108103611b5557611b54611afb565b5b50919050565b6000611b6682611449565b9150611b7183611449565b9250828202611b7f81611449565b91508282048414831517611b9657611b95611a69565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611bd782611449565b9150611be283611449565b925082611bf257611bf1611b9d565b5b828204905092915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302611c5f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611c22565b611c698683611c22565b95508019841693508086168417925050509392505050565b6000819050919050565b6000611ca6611ca1611c9c84611449565b611c81565b611449565b9050919050565b6000819050919050565b611cc083611c8b565b611cd4611ccc82611cad565b848454611c2f565b825550505050565b600090565b611ce9611cdc565b611cf4818484611cb7565b505050565b5b81811015611d1857611d0d600082611ce1565b600181019050611cfa565b5050565b601f821115611d5d57611d2e81611bfd565b611d3784611c12565b81016020851015611d46578190505b611d5a611d5285611c12565b830182611cf9565b50505b505050565b600082821c905092915050565b6000611d8060001984600802611d62565b1980831691505092915050565b6000611d998383611d6f565b9150826002028217905092915050565b611db282611557565b67ffffffffffffffff811115611dcb57611dca61174e565b5b611dd58254611b2a565b611de0828285611d1c565b600060209050601f831160018114611e135760008415611e01578287015190505b611e0b8582611d8d565b865550611e73565b601f198416611e2186611bfd565b60005b82811015611e4957848901518255600182019150602085019450602081019050611e24565b86831015611e665784890151611e62601f891682611d6f565b8355505b6001600288020188555050505b50505050505056fea26469706673582212207dd68bfdfdd2adbc2fec44b38871732f2585f8691e03ee28c4714044936d061c64736f6c63430008110033";

type MarrySignConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MarrySignConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MarrySign__factory extends ContractFactory {
  constructor(...args: MarrySignConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<MarrySign> {
    return super.deploy(overrides || {}) as Promise<MarrySign>;
  }
  override getDeployTransaction(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MarrySign {
    return super.attach(address) as MarrySign;
  }
  override connect(signer: Signer): MarrySign__factory {
    return super.connect(signer) as MarrySign__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MarrySignInterface {
    return new utils.Interface(_abi) as MarrySignInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MarrySign {
    return new Contract(address, _abi, signerOrProvider) as MarrySign;
  }
}
