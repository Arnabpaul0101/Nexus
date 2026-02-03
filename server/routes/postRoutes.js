import express from 'express';
import { createPost, getPosts, deletePost, updatePost } from '../controllers/postController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, createPost);

router.route('/:id')
  .delete(protect, deletePost)
  .put(protect, updatePost);

export default router;
