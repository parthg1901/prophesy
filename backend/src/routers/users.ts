import express from 'express';
import { loginUser, signupUser } from '../controllers';
import { loginSchema, validate, signupSchema, authMiddleware } from '../middleware';

const users = express.Router();
const authUsers = express.Router();

authUsers.use(authMiddleware);

users.post('/signup', validate(signupSchema), signupUser);

users.post('/signin', validate(loginSchema), loginUser);

export { users, authUsers };
