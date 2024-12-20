import HttpStatus from 'http-status-codes';
import multer from 'multer';
import logger from '../config/winston';
import joiError from '../utils/joiError';

/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function notFound(req, res, next) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      success: false,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND),
    },
  });
}

/**
 * METHOD_NOT_ALLOWED(405) middleware to catch error response.
 * It should be placed at the very bottom of the middleware stack.
 *
 * @param {Object} req
 * @param {Object} res
 */
export function methodNotAllowed(req, res) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      success: false,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
    },
  });
}

/**
 * Generic error response middleware
 *
 * @param  {Object}   err
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export function genericErrorHandler(err, req, res, next) {
  logger.error(err);
  console.log(err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        error: 'Unexpected field',
        message: 'The request contains an unexpected file field.',
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Multer Error',
        message: 'An error occurred while processing the file upload.',
      });
    }
  }
  if (err.isBoom) {
    return res.status(err.output.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  const error = joiError(err);
  res.status(error.code || HttpStatus.INTERNAL_SERVER_ERROR).json(error);
}
