import express from 'express';
import { addNewProduct, deleteProduct, editProduct, getAllProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', editProduct);


export default router;