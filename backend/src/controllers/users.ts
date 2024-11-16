import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/usersModel';

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET || '', { expiresIn: '3d' });
};

// login a user
const signinUser = async (req: Request, res: Response, next: NextFunction) => {
  const { wallet } = req.body;
  try {
    const user = await User.signin(wallet);

    // create a token
    const token = createToken(user._id);
    res.status(200).json({ wallet, walletSet: user.walletSet });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};

export { signinUser };
