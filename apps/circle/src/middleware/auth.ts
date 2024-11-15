import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    res.sendStatus(403);
    return;
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  try {
    const { _id } = jwt.verify(
      bearerToken,
      process.env.SECRET || ''
    ) as { _id: string };

    req.headers.user = _id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};
