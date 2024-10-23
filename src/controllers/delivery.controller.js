import HttpStatus from 'http-status-codes';
import DeliveryService from '../services/delivery.service';
import { successResponse } from '../utils/response';

class DeliveryController{
async findAll(req,res,next){
    const page= req.query.page || 1;
    const pageSize= req.query.pageSize || 10;

    DeliveryService
    .getAll(page, pageSize)
    .then((data)=> successResponse(res, data, HttpStatus.OK, 'Delivery Fetched Successfully!'))
    .catch((err)=> next(err));
}

async findById(req,res,next){
    DeliveryService
    .getOne(req.params.id)
    .then((data)=> successResponse(res, data, HttpStatus.OK, 'Delivery Retrieved Successfully!'))
    .catch((err)=> next(err));
}

async store(req,res,next){
    try{
        const data= await DeliveryService.store(req.body);
        return successResponse(res, data, HttpStatus.CREATED, 'Delivery Created Successfully');
    }catch(err){
        return next(err);
    }
}

async update(req, res, next) {
    DeliveryService
      .update(req.params.id, req.body)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Delivery Updated Successfully'))
      .catch((err) => next(err));
  }

  async destroy(req, res, next) {
    DeliveryService
      .delete(req.params.id)
      .then((data) => successResponse(res, data, HttpStatus.OK, 'Delivery Deleted Successfully'))
      .catch((err) => next(err));
  }

}



export default new DeliveryController();
