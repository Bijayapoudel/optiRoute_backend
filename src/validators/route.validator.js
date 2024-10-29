import Joi from 'joi';

const routeSchema = {
  store: Joi.object({
    admin_id: Joi.number().integer().required().messages({
      'number.base': 'Admin ID must be a number',
      'number.integer': 'Admin ID must be an integer',
      'any.required': 'Admin ID is required',
    }),
    name: Joi.string().min(3).max(100).required().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be less than 100 characters',
      'any.required': 'Name is required',
    }),
    note: Joi.string().max(255).optional().messages({
      'string.base': 'Note must be a string',
      'string.max': 'Note must be less than 255 characters',
    }),
    date: Joi.date(),
    stops: Joi.array()
      .items(
        Joi.object({
          address: Joi.string().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          name: Joi.string().required(),
        })
      )
      .required(),
  }),

  update: Joi.object({
    name: Joi.string().min(3).max(100).optional().messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must be less than 100 characters',
    }),
    note: Joi.string().max(255).optional().messages({
      'string.base': 'Note must be a string',
      'string.max': 'Note must be less than 255 characters',
    }),
    date: Joi.date(),
    stops: Joi.array()
      .items(
        Joi.object({
          address: Joi.string().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          name: Joi.string().required(),
        })
      )
      .required(),
  }),
};

export default routeSchema;
