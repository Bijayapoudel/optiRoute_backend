import HttpStatus from 'http-status-codes';
import RouteService from '../services/route.service'; // Assuming you have a RouteService similar to UserService
import { successResponse } from '../utils/response';

class RouteController {
  async findAll(req, res, next) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    RouteService.getAll(page, pageSize)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Routes Fetched Successfully'))
      .catch((err) => next(err));
  }

  async findById(req, res, next) {
    RouteService.getOne(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Route Retrieved Successfully'))
      .catch((err) => next(err));
  }

  async store(req, res, next) {
    try {
      // Call the store method from the RouteService
      const data = await RouteService.store(req.body);

      // If successful, return a success response with the created data
      return successResponse(res, data, HttpStatus.CREATED, 'Route Created Successfully');
    } catch (err) {
      // In case of an error, forward the error to the next middleware
      return next(err);
    }
  }

  async update(req, res, next) {
    RouteService.update(req.params.id, req.body)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Route Updated Successfully'))
      .catch((err) => next(err));
  }

  async destroy(req, res, next) {
    RouteService.delete(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Route Deleted Successfully'))
      .catch((err) => next(err));
  }
}

export default new RouteController();
