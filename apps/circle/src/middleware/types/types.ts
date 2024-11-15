import { FeeLevel } from '@circle-fin/developer-controlled-wallets';

export type FeeConfiguration =
  | {
      type: 'absolute';
      config: {
        maxFee: string;
        priorityFee: string;
        gasLimit: string;
      };
    }
  | {
      type: 'gas';
      config: {
        gasLimit: string;
        gasPrice: string;
      };
    }
  | {
      type: 'level';
      config: {
        feeLevel: FeeLevel;
      };
    };
