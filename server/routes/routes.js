import express from 'express';
import { addNewProduct, deleteProduct, editProduct, getAllProducts, replaceProductById } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', editProduct);
router.put('/:id', replaceProductById);

export default router;