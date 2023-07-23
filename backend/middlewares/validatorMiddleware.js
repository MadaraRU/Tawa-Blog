import { validationResult } from 'express-validator';

export const validateMiddleware = (validators) => {
  return (req, res, next) => {
    Promise.all(validators.map((validator) => validator.run(req))).then(() => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    });
  };
};
