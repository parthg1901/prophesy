import express from 'express';
import { postFaucetDripSchema, validate } from '../middleware';
import { dripFaucet } from '../controllers';

const faucet = express.Router();

/**
 * POST - /faucet/drips
 * Request testnet tokens to specified wallet.
 *
 * Params:
 *  address: string         - Wallet address
 *  blockchain: string      - Specified blockchain
 *
 * Returns: null
 *
 */
faucet.post('/drips', validate(postFaucetDripSchema), dripFaucet);

export { faucet };
