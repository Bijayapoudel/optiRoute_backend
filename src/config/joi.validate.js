import Joi from "joi";

/**
 * Utility helper for Joi validation.
 *
 * @param  {object}  schema
 * @return {null|object}
 */
function validate(schema) {
  return function (req, res, next) {
    try {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default validate;
