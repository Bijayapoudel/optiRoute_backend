import Joi from 'joi';

const routeSchema = {
  store: Joi.object({
    admin_id: Joi.number()
      .integer()
      .required()
      .messages({
        'number.base': 'Admin ID must be a number',
        'number.integer': 'Admin ID must be an integer',
        'any.required': 'Admin ID is required',
      }),
    user_id: Joi.number()
      .integer()
      .required()
      .messages({
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'any.required': 'User ID is required',
      }),
    name: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be less than 100 characters',
        'any.required': 'Name is required',
      }),
    note: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.base': 'Note must be a string',
        'string.max': 'Note must be less than 255 characters',
      }),
    optimize_mode: Joi.string()
      .valid('shortest', 'fastest')
      .required()
      .messages({
        'string.base': 'Optimize mode must be a string',
        'any.only': 'Optimize mode must be either "shortest" or "fastest"',
        'any.required': 'Optimize mode is required',
      }),
    travel_mode: Joi.string()
      .valid('driving', 'walking', 'bicycling', 'transit')
      .required()
      .messages({
        'string.base': 'Travel mode must be a string',
        'any.only': 'Travel mode must be one of: driving, walking, bicycling, transit',
        'any.required': 'Travel mode is required',
      }),
  }),

  update: Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .optional()
      .messages({
        'string.base': 'Name must be a string',
        'string.min': 'Name must be at least 3 characters long',
        'string.max': 'Name must be less than 100 characters',
      }),
    note: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.base': 'Note must be a string',
        'string.max': 'Note must be less than 255 characters',
      }),
    optimize_mode: Joi.string()
      .valid('shortest', 'fastest')
      .optional()
      .messages({
        'string.base': 'Optimize mode must be a string',
        'any.only': 'Optimize mode must be either "shortest" or "fastest"',
      }),
    travel_mode: Joi.string()
      .valid('driving', 'walking', 'bicycling', 'transit')
      .optional()
      .messages({
        'string.base': 'Travel mode must be a string',
        'any.only': 'Travel mode must be one of: driving, walking, bicycling, transit',
      }),
  }),
};

export default routeSchema;
