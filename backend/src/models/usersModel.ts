import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { circleDevSdk } from '../services/devControlledWalletSdk';
import { randomUUID } from 'crypto';

const Schema = mongoose.Schema;

interface IUser {
  _id: string;
  wallet: string
  walletSet: string;
}

interface UserModel extends Model<IUser> {
  signin(wallet: string): Promise<IUser>;
}

const userSchema = new Schema<IUser, UserModel>({
  wallet: {
    type: String,
    required: true,
    unique: true
  },
  walletSet: {
    type: String,
    required: true,
    unique: true
  }
});

// static signup method
userSchema.statics.signin = async function (wallet: string) {
  // validation
  const exists = await this.findOne({ wallet });

  if (exists) {
    return exists;
  }

  try {
    const response = await circleDevSdk.createWalletSet({
      idempotencyKey: randomUUID(),
      name: wallet
    });
    await circleDevSdk.createWallets({
      idempotencyKey: randomUUID(),
      walletSetId: response.data?.walletSet.id!,
      count: 1,
      blockchains: ["ETH-SEPOLIA"],
      accountType: "SCA"
    })
    const user = await this.create({
      wallet,
      walletSet: response.data?.walletSet.id
    });
  
    return user;

  } catch (error) {
    console.log(error)
    throw Error('Error creating wallet set');
  }
};


export default mongoose.model<IUser, UserModel>('User', userSchema);
