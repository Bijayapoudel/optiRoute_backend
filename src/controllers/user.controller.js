import HttpStatus from 'http-status-codes';
import UserService from '../services/user.service';
import { successResponse } from '../utils/response';

class UserController {
  async findAll(req, res, next) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    UserService
      .getAll(page, pageSize)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Users Fetched Successfully'))
      .catch((err) => next(err));
  }

  async findById(req, res, next) {
    UserService
      .getOne(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'user Retrieved Successfully'))
      .catch((err) => next(err));
  }

  async store(req, res, next) {
      try {
        // Call the store method from the UserService
        const data = await UserService.store(req.body);
  
        // If successful, return a success response with the created data
        return successResponse(res, data, HttpStatus.CREATED, 'User Created Successfully');
      } catch (err) {
        // In case of an error, forward the error to the next middleware
        return next(err);
      }
    }

  async update(req, res, next) {
    UserService
      .update(req.params.id, req.body)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'User Updated Successfully'))
      .catch((err) => next(err));
  }

  async destroy(id) {
    UserService
      .destroy(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'User Deleted Successfully'))
      .catch((err) => next(err));
  }
}

export default new UserController();
