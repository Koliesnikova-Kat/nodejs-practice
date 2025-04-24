import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  patchProductController,
} from '../controllers/products.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.post('/', ctrlWrapper(createProductController));

router.patch('/:productId', ctrlWrapper(patchProductController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
