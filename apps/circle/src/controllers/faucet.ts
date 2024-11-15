import { NextFunction, Request, Response } from 'express';
import { circleDevSdk } from '../services/devControlledWalletSdk';

export const dripFaucet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await circleDevSdk.requestTestnetTokens({
      address: req.body.address,
      blockchain: req.body.blockchain,
      usdc: true
    });

    res.status(200).send();
  } catch (error: unknown) {
    next(error);
  }
};
