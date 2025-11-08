import express from 'express';
const usersRouter = express.Router();
import UsersController from "../controllers/users.js";
import db from '../database/DataSourceSQL.js';
const usersController = new UsersController(db);

usersRouter.get('/', usersController.getOneOrGetAll);
usersRouter.get('/:id', usersController.getOne);
usersRouter.post('/', usersController.add);
usersRouter.put('/', usersController.edit);
usersRouter.put('/:id', usersController.edit);
usersRouter.patch('/', usersController.edit);
usersRouter.patch('/:id', usersController.edit);
usersRouter.delete('/', usersController.delete);
usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
