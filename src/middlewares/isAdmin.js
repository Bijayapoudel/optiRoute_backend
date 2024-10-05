import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import Admin from '../models/admin.model';

/**
 * Route authentication middleware to verify a token for admin
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */
export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: 'You are not authorized to perform this operation!' });
      } else {
        Admin.query({
          where: { id: decoded.sub },
          select: ['email', 'id', 'role'],
        })
          .fetch()
          .then((admin) => {
            if (!admin) {
              res.status(HttpStatus.NOT_FOUND).json({ error: 'No such admin' });
            } else {
              req.currentAdmin = admin;
              next();
            }
          });
      }
    });
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      error: 'No token provided',
    });
  }
};
