import express from 'express';
import {
  getWalletTokenBalance,
  listWallets,
  getWallet,
  createWalletSet,
  createWallet
} from '../controllers/wallets';
import {
  authMiddleware,
  createWalletSchema,
  createWalletSetSchema,
  getWalletSchema,
  listWalletsSchema,
  validate,
  walletTokenBalanceSchema
} from '../middleware';

const walletRouter = express.Router();
const authWalletRouter = express.Router();
authWalletRouter.use(authMiddleware);

authWalletRouter.get('/', validate(listWalletsSchema), listWallets);
walletRouter.get('/:id', validate(getWalletSchema), getWallet);
authWalletRouter.post('/', validate(createWalletSchema), createWallet);
authWalletRouter.post('/set', validate(createWalletSetSchema), createWalletSet);
walletRouter.get(
  '/:id/balances',
  validate(walletTokenBalanceSchema),
  getWalletTokenBalance
);

export { walletRouter, authWalletRouter };
