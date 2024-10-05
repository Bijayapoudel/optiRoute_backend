
import HttpStatus from 'http-status-codes';

export default (req, res, next) => {
  if (req.currentAdmin && req.currentAdmin.get('role') === '0') {
    next();
  } else {
    res.status(HttpStatus.FORBIDDEN).json({
      error: 'Access denied. Super Admin privileges required.',
    });
  }
};