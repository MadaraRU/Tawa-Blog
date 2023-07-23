import { body } from 'express-validator';

export const createBlogValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .isString()
    .withMessage('Title should be a string'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isString()
    .withMessage('Content should be a string'),
  body('keywords')
    .notEmpty()
    .withMessage('Keywords is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Keywords should be an array with at least one keyword'),
];

export const updateBlogValidator = [
  body('title').optional().isString().withMessage('Title should be a string'),
  body('content')
    .optional()
    .isString()
    .withMessage('Content should be a string'),
  body('keywords')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Keywords should be an array with at least one keyword'),
];

export const createCommentValidator = [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .bail()
    .isString()
    .withMessage('Content should be a string'),
];
