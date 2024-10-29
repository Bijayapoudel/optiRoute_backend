import Joi from 'joi';

const stopSchema = {
  store: Joi.object({
    route_id: Joi.number().integer().required().messages({
      'number.base': 'Route ID must be a number.',
      'number.integer': 'Route ID must be an integer.',
      'any.required': 'Route ID is a required field.',
    }),
    order: Joi.number().integer().required().messages({
      'number.base': 'Order must be a number.',
      'number.integer': 'Order must be an integer.',
      'any.required': 'Order is a required field.',
    }),
    address: Joi.string().required(),
    name: Joi.string().min(3).max(50).required().messages({
      'string.base': 'Name should be a string.',
      'string.empty': 'Name cannot be empty.',
      'string.min': 'Name should be at least 3 characters long.',
      'string.max': 'Name should not exceed 50 characters.',
      'any.required': 'Name is a required field.',
    }),
    latitude: Joi.number().required().messages({
      'number.base': 'Latitude must be a number.',
      'any.required': 'Latitude is a required field.',
    }),
    longitude: Joi.number().required().messages({
      'number.base': 'Longitude must be a number.',
      'any.required': 'Longitude is a required field.',
    }),
  }),

  update: Joi.object({
    route_id: Joi.number().integer().optional().messages({
      'number.base': 'Route ID must be a number.',
      'number.integer': 'Route ID must be an integer.',
    }),
    order: Joi.number().integer().optional().messages({
      'number.base': 'Order must be a number.',
      'number.integer': 'Order must be an integer.',
    }),
    address: Joi.string().required(),
    name: Joi.string().min(3).max(50).optional().messages({
      'string.base': 'Name should be a string.',
      'string.min': 'Name should be at least 3 characters long.',
      'string.max': 'Name should not exceed 50 characters.',
    }),
    latitude: Joi.number().optional().messages({
      'number.base': 'Latitude must be a number.',
    }),
    longitude: Joi.number().optional().messages({
      'number.base': 'Longitude must be a number.',
    }),
  }),
};

export default stopSchema;
