export const Permit2 = [
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: 'address',
                name: 'token',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
            ],
            internalType: 'struct ISignatureTransfer.TokenPermissions',
            name: 'permitted',
            type: 'tuple',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'deadline',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.PermitTransferFrom',
        name: 'permitTransferFrom',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'requestedAmount',
            type: 'uint256',
          },
        ],
        internalType: 'struct ISignatureTransfer.SignatureTransferDetails',
        name: 'transferDetails',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'signatureTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
