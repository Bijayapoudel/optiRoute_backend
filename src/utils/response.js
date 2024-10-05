import HttpStatus from 'http-status-codes';

/**
 * This return successful response
 *
 * @param res
 * @param data
 * @param status
 * @returns {*}
 */
export function successResponse(res, data, status = HttpStatus.OK, message) {
  return res.status(status).json({ 'success': true, 'data': data, 'message':message });
}

/**
 * This return unsuccessful response
 *
 * @param res
 * @param message
 * @param status
 * @returns {*}
 */
export function errorResponse(res, message, error, status = HttpStatus.UNPROCESSABLE_ENTITY) {
  return res.status(status).json({ 'success': false, 'errors':error, 'message': message });
}
