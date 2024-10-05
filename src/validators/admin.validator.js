import Joi from 'joi';
import { createAdmin, updateAdmin } from '../services/admin.service';

export default {
  createAdmin: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
    password: Joi.string().min(6).required(),
  }),

  updateAdmin: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone_number: Joi.string(),
    password: Joi.string().min(6),
  }),

  adminLogin: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      .messages({
        'any.required': 'Email is required',
        'string.email': 'Email must be valid',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password should not be empty',
    }),
  }),
};
