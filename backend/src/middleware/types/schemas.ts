import * as yup from 'yup';

// User
export const signupSchema = yup.object({
  body: yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const loginSchema = yup.object({
  body: yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

// Wallet
export const walletTokenBalanceSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict(),
  query: yup
    .object({
      includeAll: yup.bool().optional(),
      name: yup.string().optional(),
      tokenAddresses: yup.array().of(yup.string().required()).optional(),
      standard: yup.string().optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const listWalletsSchema = yup.object({
  query: yup
    .object({
      address: yup.string().optional(),
      blockchain: yup.string().optional(),
      walletSetId: yup.string().optional(),
      refId: yup.string().optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const getWalletSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const createWalletSetSchema = yup.object({
  body: yup
    .object({
      name: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const createWalletSchema = yup.object({
  body: yup
    .object({
      blockchain: yup.string().required(),
    })
    .noUnknown(true)
    .strict()
});

// Faucet
export const postFaucetDripSchema = yup.object({
  body: yup
    .object({
      address: yup.string().required(),
      blockchain: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

// Transactions
export const listTransactionsSchema = yup.object({
  query: yup
    .object({
      blockchain: yup.string().optional(),
      custodyType: yup.string().optional(),
      destinationAddress: yup.string().optional(),
      includeAll: yup.boolean().optional(),
      operation: yup.string().optional(),
      state: yup.string().optional(),
      txHash: yup.string().optional(),
      txType: yup.string().optional(),
      walletIds: yup.array().of(yup.string().required()).optional(),
      from: yup.date().optional(),
      to: yup.date().optional(),
      pageBefore: yup.string().optional(),
      pageAfter: yup.string().optional(),
      pageSize: yup.number().optional()
    })
    .noUnknown(true)
    .strict()
});

export const transferTokensSchema = yup.object({
  body: yup
    .object({
      idempotencyKey: yup.string().optional(),
      amount: yup.string().required(),
      destinationAddress: yup.string().required(),
      feeLevel: yup.string().optional(),
      gasLimit: yup.string().optional(),
      gasPrice: yup.string().optional(),
      maxFee: yup.string().optional(),
      priorityFee: yup.string().optional(),
      nftTokenIds: yup.array().of(yup.string().required()).optional(),
      refId: yup.string().optional(),
      tokenId: yup.string().required(),
      walletId: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const contractExecutionTransactionSchema = yup.object({
  body: yup
    .object({
      amount: yup.string().optional(),
      contractAddress: yup.string().required(),
      feeLevel: yup.string().optional(),
      gasLimit: yup.string().optional(),
      gasPrice: yup.string().optional(),
      maxFee: yup.string().optional(),
      priorityFee: yup.string().optional(),
      walletId: yup.string().required(),
      abiFunctionSignature: yup.string().required(),
      abiParameters: yup.array().of(yup.mixed().required()).optional()
    })
    .noUnknown(true)
    .strict()
});

export const estimateContractExecutionTransactionSchema = yup.object({
  body: yup
    .object({
      contractAddress: yup.string().required(),
      abiFunctionSignature: yup.string().required(),
      abiParameters: yup.array().of(yup.mixed().required()).optional(),
      walletId: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const validateAddressSchema = yup.object({
  body: yup
    .object({
      address: yup.string().required(),
      blockchain: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});

export const getTransactionSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict(),
  query: yup
    .object({
      txType: yup.string().optional()
    })
    .noUnknown(true)
    .strict()
});

export const estimateTransferTokensSchema = yup.object({
  body: yup
    .object({
      amount: yup.array().of(yup.string().required()).required(),
      destinationAddress: yup.string().required(),
      nftTokenIds: yup.array().of(yup.string().required()).optional(),
      sourceAddress: yup.string().optional(),
      tokenId: yup.string().required(),
      walletId: yup.string().optional()
    })
    .noUnknown(true)
    .strict()
});

// Tokens
export const getTokenDetailsSchema = yup.object({
  params: yup
    .object({
      id: yup.string().required()
    })
    .noUnknown(true)
    .strict()
});