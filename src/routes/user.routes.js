import { Router } from 'express';
import { getBalance } from '../models/user.model.js';

const userRoutes = Router();

userRoutes.get('/balance', getBalance);

export { userRoutes };
