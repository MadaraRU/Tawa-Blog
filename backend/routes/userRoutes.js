import express from 'express';
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import {
  loginValidator,
  registerValidator,
} from '../validators/authValidator.js';
import { validateMiddleware } from '../middlewares/validatorMiddleware.js';

const router = express.Router();

router.post('/register', validateMiddleware(registerValidator), register);

router.post('/login', validateMiddleware(loginValidator), login);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
