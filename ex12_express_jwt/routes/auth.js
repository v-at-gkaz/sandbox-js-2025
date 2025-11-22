import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/auth.js';

authRouter.post('/sign-in', authController.signIn);
authRouter.post('/sign-up', authController.signUp);

export default authRouter;
