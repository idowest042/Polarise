import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

// Use memory storage instead of disk storage
const upload = multer({ storage: multer.memoryStorage() });

foodRouter.post('/addfood', addFood);
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;