import express from 'express';
import { addNews, updateNews, deleteNews } from '../controllers/news.controller.js';

const router = express.Router();

router.post('/add-news', addNews);
router.put('/update-news/:id', updateNews);
router.delete('/delete-news/:id', deleteNews);

export default router;
