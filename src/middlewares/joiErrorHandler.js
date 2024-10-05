import HttpStatus from 'http-status-codes';
import { errorResponse } from '../utils/response';

/**
 * Joi error handler middleware
 *
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
export default (err, req, res, next) => {
  if (err.isJoi) {
    const error = {
      code: HttpStatus.UNPROCESSABLE_ENTITY,
      message: HttpStatus.getStatusText(HttpStatus.UNPROCESSABLE_ENTITY),
      details:
        err.details &&
        err.details.map((err) => {
          return {
            message: err.message,
            param: err.path,
          };
        }),
    };
    if (error.details && error.details[0] && error.details[0].message.includes('phone_number')) {
      const customErrorMessage = 'Invalid phone number format';
      const invalidPhoneNumberError = {
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validation Error',
        details: [
          {
            message: customErrorMessage,
            param: ['phone_number'],
          },
        ],
      };

      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json(
          errorResponse(
            res,
            invalidPhoneNumberError.details[0].message,
            error,
            invalidPhoneNumberError.code
          )
        );
    }
    return res
    .status(HttpStatus.UNPROCESSABLE_ENTITY)
    .json(errorResponse(res, error.details[0].message, error, error.code));
  }
  // If this isn't a Joi error, send it to the next error handler
  return next(err);
};
