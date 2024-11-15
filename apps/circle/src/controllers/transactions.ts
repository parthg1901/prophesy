import { Request, Response, NextFunction } from 'express';
import { getFeeConfiguration } from '../shared/utils';
import { circleDevSdk } from '../services/devControlledWalletSdk';
import { randomUUID } from 'crypto';

export const listTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.listTransactions({
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeConfig = getFeeConfiguration(req);
    if (!feeConfig) {
      throw new Error('Invalid fee configuration');
    }

    const response = await circleDevSdk.createTransaction({
      fee: feeConfig,
      idempotencyKey: randomUUID(),
      refId: randomUUID(),
      amount: [req.body.amount],
      destinationAddress: req.body.destinationAddress,
      nftTokenIds: req.body.nftTokenIds,
      tokenId: req.body.tokenId,
      walletId: req.body.walletId
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const createContractExecutionTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeConfig = getFeeConfiguration(req);
    if (!feeConfig) {
      throw new Error('Invalid fee configuration');
    }

    const response = await circleDevSdk.createContractExecutionTransaction({
      fee: feeConfig,
      idempotencyKey: randomUUID(),
      refId: randomUUID(),
      contractAddress: req.body.contractAddress,
      abiFunctionSignature: req.body.abiFunctionSignature,
      walletId: req.body.walletId,
      amount: req.body.amount,
      abiParameters: req.body.abiParameters,
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const estimateContractExecutionFees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.estimateContractExecutionFee({
      contractAddress: req.body.contractAddress,
      abiFunctionSignature: req.body.abiFunctionSignature,
      source: {
        walletId: req.body.walletId
      },
      abiParameters: req.body.abiParameters,
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
}

export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.getTransaction({
      id: req.params.id,
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const validateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.validateAddress({
      ...req.body
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const estimateTransferFee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleDevSdk.estimateTransferFee({
      userToken: req.headers['user'],
      ...req.body
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};
