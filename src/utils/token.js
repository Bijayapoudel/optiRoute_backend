import jwt from 'jsonwebtoken';
import moment from 'moment';
import bcrypt from 'bcrypt';
import { EMAIL } from '../constants/email';

/**
 * Generate token
 * @param {String} userId
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (userId, secret = process.env.TOKEN_SECRET_KEY) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(30, 'minutes').unix(),
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @returns {Promise<Token>}
 */
export const verifyToken = (token, secret) => {
  const payload = jwt.verify(token, secret);
  if (!payload) {
    throw new Error('Token not found.');
  }
  return payload;
};

export const generateActivationToken = () => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(EMAIL.USER_ACTIVATION.ACTIVATION_LINK_SECRET_KEY, salt);
};
