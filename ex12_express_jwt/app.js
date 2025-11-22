import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import usersRouter from './routes/users.js';
import productRouter from './routes/product.js';
import authRouter from './routes/auth.js';
import {authMiddleware} from "./middlewares/auth.js";

const whitelist = [
    '/auth',
];

const app = express();

app.use(express.static(join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(authMiddleware(whitelist));


app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);

export default app;
