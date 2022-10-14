import express from 'express';
import {getCategory, createCategory} from '../controllers/categoryController.js';

 const router = express.Router();

router.get('/categories',getCategory)
router.post('/categories',createCategory)


export default router;