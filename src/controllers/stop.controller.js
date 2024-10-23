import HttpStatus from 'http-status-codes';
import StopService from '../services/stop.service';
import { successResponse } from '../utils/response';

class StopController {
  async findAll(req, res, next) {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    StopService.getAll(page, pageSize)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Stops Fetched Successfully!'))
      .catch((err) => next(err));
  }

  async findById(req, res, next) {
    StopService.getOne(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Stop Retrieved Successfully'))
      .catch((err) => next(err));
  }

  async store(req, res, next) {
    try {
      const data = await StopService.store(req.body);
      return successResponse(res, data, HttpStatus.CREATED, 'Stop Created Successfully');
    } catch (error) {
      return next(err);
    }
  }

  async update(req, res, next) {
    StopService.update(req.params.id, req.body)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Stop Updated Successfully'))
      .catch((err) => next(err));
  }

  async destroy(req, res, next) {
    StopService.delete(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Stop Deleted Successfully'))
      .catch((err) => next(err));
  }
}

export default new StopController();
