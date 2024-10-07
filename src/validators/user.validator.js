import Joi from 'joi';

const userSchema = {
  store: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.base': 'Name should be a string.',
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name should be at least 3 characters long.',
        'string.max': 'Name should not exceed 30 characters.',
        'any.required': 'Name is a required field.'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.base': 'Email should be a string.',
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is a required field.'
      }),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
      .messages({
        'string.base': 'Password should be a string.',
        'string.empty': 'Password cannot be empty.',
        'string.min': 'Password should be at least 6 characters long.',
        'string.max': 'Password should not exceed 30 characters.',
        'any.required': 'Password is a required field.'
      }),
    phone_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        'string.base': 'Phone number should be a string.',
        'string.empty': 'Phone number cannot be empty.',
        'string.pattern.base': 'Phone number must contain only digits.',
        'any.required': 'Phone number is a required field.'
      }),
    address: Joi.string()
      .max(100)
      .optional()
      .messages({
        'string.base': 'Address should be a string.',
        'string.max': 'Address should not exceed 100 characters.',
      }),
  }),

  update: Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .optional()
      .messages({
        'string.base': 'Name should be a string.',
        'string.min': 'Name should be at least 3 characters long.',
        'string.max': 'Name should not exceed 30 characters.',
      }),
    email: Joi.string()
      .email()
      .optional()
      .messages({
        'string.base': 'Email should be a string.',
        'string.email': 'Email must be a valid email address.',
      }),
    password: Joi.string()
      .min(6)
      .max(30)
      .optional()
      .messages({
        'string.base': 'Password should be a string.',
        'string.min': 'Password should be at least 6 characters long.',
        'string.max': 'Password should not exceed 30 characters.',
      }),
    phone_number: Joi.string()
      .pattern(/^[0-9]+$/)
      .optional()
      .messages({
        'string.base': 'Phone number should be a string.',
        'string.pattern.base': 'Phone number must contain only digits.',
      }),
    address: Joi.string()
      .max(100)
      .optional()
      .messages({
        'string.base': 'Address should be a string.',
        'string.max': 'Address should not exceed 100 characters.',
      }),
  })
};

export default userSchema;
