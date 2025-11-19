import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/auth.js';

authRouter.post('/sign-in', authController.signIn);

export default authRouter;
