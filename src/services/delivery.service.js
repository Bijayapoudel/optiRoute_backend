import Boom from '@hapi/boom';
import Delivery from '../models/delivery.model';
import { DeliveryDTO } from '../dtos/deliveryDTO';
import logger from '../config/winston';

class DeliveryService {
  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const deliveryData = await Delivery.query(queryBuilder).fetchAll();
      if (!deliveryData) return deliveryData;

      const deliveryCollection = deliveryData.toJSON();
      const deliveryDTOs = deliveryCollection.map((delivery) =>
        DeliveryDTO.fromDeliveryEntity(delivery)
      );
      return deliveryDTOs;
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Delivery', error);
    }
  }

  async store(deliveryData) {
    try {
      const { stop_id, note, status, ratings } = deliveryData;
      return new Delivery({
        stop_id,
        note,
        status,
        ratings,
      })
        .save()
        .then((delivery) => DeliveryDTO.fromDeliveryEntity(delivery.attributes))
        .catch((error) => {
          logger.error('Error Creating the Delivery', error);
          throw Boom.internal('Internal Server Error');
        });
    } catch (error) {
      throw Boom.badImplementation('Error Creating the Delivery', error);
    }
  }

  async getOne(id) {
    try {
      const delivery = await Delivery.query().where({ id, is_deleted: 0 }).first();
      if (!delivery) throw Boom.notFound('Delivery Not Found!');

      return DeliveryDTO.fromDeliveryEntity(delivery);
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Delivery', error);
    }
  }

async update(id, deliveryData){
    const {stop_id, note, status, ratings}=deliveryData;
    try{
        const existingDelivery= await Delivery.where({id, is_deleted:0}).fetch({require:false});
        if(!existingDelivery){
            throw Boom.notFound('Delivery Not Found!');
        }
    const updatedData={
        stop_id,
        note,
        status,
        ratings
    };

    const updatedDelivery=await existingDelivery.save(updatedData,{method:'update', patch:true});

    return DeliveryDTO.fromDeliveryEntity(updatedDelivery.attributes);
}catch(error){
    throw Boom.badImplementation('Error Updating Delivery', error);
}
}

async delete(id){
    try{
        const delivery= await Delivery.where({id, is_deleted:0}).fetch({require:false});
        if(!delivery){
            throw Boom.notFound('Delivery Not Found');
        }
        await delivery.save({is_deleted:1}, {method:'update', patch:true});
        return {
            success: true
        };
    }catch(error){
        logger.error('Error Deleting Delivery', error);
        throw Boom.internal('Internal Server Error');
    }
}
}

export default new DeliveryService();
