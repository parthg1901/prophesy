import express from 'express';
import { signinUser } from '../controllers';
import { validate, signinSchema } from '../middleware';

const users = express.Router();

users.post('/signin', validate(signinSchema), signinUser);

export { users };
