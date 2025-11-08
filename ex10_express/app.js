import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import {fileURLToPath} from "node:url";
import {dirname, join} from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import usersRouter from './routes/users.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(join(__dirname, 'public')));

app.use('/user', usersRouter);

export default app;
