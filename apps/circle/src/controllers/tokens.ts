import { Request, Response, NextFunction } from 'express';
import { circleDevSdk } from '../services/devControlledWalletSdk';

export const getTokenDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.getToken({
      id: req.params.id
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};
