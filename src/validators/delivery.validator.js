import Joi from 'joi';

const deliverySchema = {
  store: Joi.object({
  
    stop_id: Joi.number()
      .integer()
      .required()
      .messages({
        'number.base': 'Stop ID (stop_id) must be a number',
        'number.integer': 'Stop ID (stop_id) must be an integer',
        'any.required': 'Stop ID (stop_id) is required',
      }),
    status: Joi.string()
      .valid('delivery', 'postponed')
      .required()
      .messages({
        'string.base': 'Status must be a string',
        'any.only': 'Status must be either "delivery" or "postponed"',
        'any.required': 'Status is required',
      }),
    note: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.base': 'Note must be a string',
        'string.max': 'Note must be less than 255 characters',
      }),
    ratings: Joi.number()
      .min(1)
      .max(5)
      .optional()
      .messages({
        'number.base': 'Ratings must be a number',
        'number.min': 'Ratings must be at least 1',
        'number.max': 'Ratings must be at most 5',
      }),
  }),

  update: Joi.object({
    stop_id: Joi.number()
      .integer()
      .optional()
      .messages({
        'number.base': 'Stop ID (stop_id) must be a number',
        'number.integer': 'Stop ID (stop_id) must be an integer',
      }),
    status: Joi.string()
      .valid('delivery', 'postponed')
      .optional()
      .messages({
        'string.base': 'Status must be a string',
      }),
    note: Joi.string()
      .max(255)
      .optional()
      .messages({
        'string.base': 'Note must be a string',
        'string.max': 'Note must be less than 255 characters',
      }),
    ratings: Joi.number()
      .min(1)
      .max(5)
      .optional()
      .messages({
        'number.base': 'Ratings must be a number',
        'number.min': 'Ratings must be at least 1',
        'number.max': 'Ratings must be at most 5',
      }),
  }),
};

export default deliverySchema;
