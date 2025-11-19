import express from 'express';
const usersRouter = express.Router();
import usersController from '../controllers/users.js';

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
