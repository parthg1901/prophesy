import { circleDevSdk } from '../services/devControlledWalletSdk';
import { Request, Response, NextFunction } from 'express';
import Users from '../models/usersModel';

export const getWalletTokenBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.getWalletTokenBalance({
      id: req.params.id,
      // Yup validation in the middleware allows the spread of the req.query valid.
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const listWallets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Users.findById(req.headers.user);
    if (!user) {
      res.status(401).json({ error: 'Request is not authorized' });
      return;
    }
    const response = await circleDevSdk.listWallets({
      walletSetId: user.walletSet,
      // Yup validation in the middleware allows the spread of the req.query valid.
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const getWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.getWallet({
      id: req.params.id
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const createWalletSet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.createWalletSet({
      name: req.body.name
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const createWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Users.findById(req.headers.user);
    if (!user) {
      res.status(401).json({ error: 'Request is not authorized' });
      return;
    }
    const response = await circleDevSdk.createWallets({
      blockchains: [req.body.blockchain],
      accountType: req.body.blockchain === 'SOL-DEVNET' || req.body.blockchain === 'AVAX-FUJI' ? 'EOA' : 'SCA',
      walletSetId: user?.walletSet,
      count: 1
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};
