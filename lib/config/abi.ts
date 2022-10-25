export const MARRYSIGN_ABI = [
  {
    inputs: [],
    stateMutability: 'payable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AccessDenied',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BobNotSpecified',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CallerIsNotOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'EmptyContent',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAgreementId',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTimestamp',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MustPayExactTerminationCost',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ZeroTerminationCost',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'AgreementAccepted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'AgreementCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'AgreementRefused',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'AgreementTerminated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'acceptedAt',
        type: 'uint256',
      },
    ],
    name: 'acceptAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'bob',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'content',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'terminationCost',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'createdAt',
        type: 'uint256',
      },
    ],
    name: 'createAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'getAgreement',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'alice',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bob',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'content',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'terminationCost',
            type: 'uint256',
          },
          {
            internalType: 'enum MarrySign.AgreementState',
            name: 'state',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'updatedAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct MarrySign.Agreement',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAgreementCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getAgreements',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'alice',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'bob',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'content',
            type: 'bytes',
          },
          {
            internalType: 'uint256',
            name: 'terminationCost',
            type: 'uint256',
          },
          {
            internalType: 'enum MarrySign.AgreementState',
            name: 'state',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'updatedAt',
            type: 'uint256',
          },
        ],
        internalType: 'struct MarrySign.Agreement[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'refusedAt',
        type: 'uint256',
      },
    ],
    name: 'refuseAgreement',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'index',
        type: 'uint256',
      },
    ],
    name: 'terminateAgreement',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
