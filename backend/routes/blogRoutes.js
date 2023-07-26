import express from 'express';
import {
  addBlog,
  addComment,
  deleteBlog,
  dislikeBlogPost,
  getAllBlogs,
  getAllComments,
  getBlogById,
  getUserBlog,
  likeBlogPost,
  removeComment,
  removeDislikeFromBlogPost,
  removeLikeFromBlogPost,
  updateBlog,
} from '../controllers/blogController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateMiddleware } from '../middlewares/validatorMiddleware.js';
import {
  createBlogValidator,
  createCommentValidator,
  updateBlogValidator,
} from '../validators/blogValidator.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/my-blogs', protect, getUserBlog);
router.post('/', protect, validateMiddleware(createBlogValidator), addBlog);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, validateMiddleware(updateBlogValidator), updateBlog)
  .delete(protect, deleteBlog);

router
  .route('/:id/like')
  .post(protect, likeBlogPost)
  .delete(protect, removeLikeFromBlogPost);
router
  .route('/:id/dislike')
  .post(protect, dislikeBlogPost)
  .delete(protect, removeDislikeFromBlogPost);

router
  .route('/:id/comments')
  .get(protect, getAllComments)
  .post(protect, validateMiddleware(createCommentValidator), addComment);
router.route('/:id/comments/:commentId').delete(protect, removeComment);

export default router;
