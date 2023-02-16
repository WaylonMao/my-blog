import express from 'express';
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', protect, addPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;
