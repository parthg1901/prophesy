import express from 'express';
import {
  getWalletTokenBalance,
  listWallets,
  getWallet,
  createWalletSet,
  createWallet
} from '../controllers/wallets';
import {
  createWalletSchema,
  createWalletSetSchema,
  getWalletSchema,
  listWalletsSchema,
  validate,
  walletTokenBalanceSchema
} from '../middleware';

const walletRouter = express.Router();

walletRouter.get('/', validate(listWalletsSchema), listWallets);
walletRouter.get('/:id', validate(getWalletSchema), getWallet);
walletRouter.post('/', validate(createWalletSchema), createWallet);
walletRouter.post('/set', validate(createWalletSetSchema), createWalletSet);
walletRouter.get(
  '/:id/balances',
  validate(walletTokenBalanceSchema),
  getWalletTokenBalance
);

export { walletRouter };
