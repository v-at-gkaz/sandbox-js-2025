import express from 'express';
const productRouter = express.Router();
import productController from '../controllers/product.js';

productRouter.get('/', productController.getAll);

export default productRouter;
