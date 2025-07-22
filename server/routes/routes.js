import express from 'express';
import { addNewProduct, deleteProduct, getAllProducts } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addNewProduct);
router.delete('/:id', deleteProduct);


export default router;