import { body } from 'express-validator';

export const registerValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .bail()
    .isString()
    .withMessage('Username should be a string')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username should have a length between 3 and 30 characters'),

  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .bail()
    .isString()
    .withMessage('First name should be a string'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .bail()
    .isString()
    .withMessage('Last name should be a string'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password should be a string')
    .isLength({ min: 6 })
    .withMessage('Password should have a minimum length of 6 characters'),
];

export const loginValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];
