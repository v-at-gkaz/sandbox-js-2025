import express from 'express';
const ordersRouter = express.Router();
import ordersController from '../controllers/orders.js';

ordersRouter.get('/', ordersController.getAll);
ordersRouter.get('/:id', ordersController.getOne);
ordersRouter.get('/sql/:id', ordersController.getOneSQL); // SQL variant

/*ordersRouter.post('/', ordersController.add);
ordersRouter.put('/:id', ordersController.edit);
ordersRouter.patch('/:id', ordersController.edit);*/
ordersRouter.delete('/:id', ordersController.delete);

export default ordersRouter;
