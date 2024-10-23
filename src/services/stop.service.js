import Boom from '@hapi/boom';
import Stop from '../models/stop.route';
import { StopDTO } from '../dtos/stopDTO';
import logger from '../config/winston';

class StopService {
  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const stopData = await Stop.query(queryBuilder).fetchAll();
      if (!stopData) return stopData;

      const stopCollection = stopData.toJSON();
      const stopDTOs = stopCollection.map((stop) => StopDTO.fromStopEntity(stop));
      return stopDTOs;
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Stops', error);
    }
  }

  async getOne(id) {
    try {
      const stop = await Stop.query().where({ id, is_deleted: 0 }).first();
      if (!stop) throw Boom.notFound('Stop Not Found');

      return StopDTO.fromStopEntity(stop);
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Stop', error);
    }
  }

  async store(stopData) {
    try {
      const { route_id, order, name, latitude, longitude } = stopData;
      return new Stop({
        route_id,
        order,
        name,
        latitude,
        longitude,
        is_deleted: 0,
      })
        .save()
        .then((stop) => StopDTO.fromStopEntity(stop.attributes))
        .catch((error) => {
          logger.error('Error Creating the Stop', error);
          throw Boom.internal('Internal Server Error');
        });
    } catch (error) {
      throw Boom.badImplementation('Error Creating the Stop', error);
    }
  }

  async update(id, stopData) {
    const { route_id, order, name, latitude, longitude } = stopData;
    try {
      const existingStop = await Stop.where({ id, is_deleted: 0 }).fetch({ require: false });
      if (!existingStop) {
        throw Boom.notFound('Stop Not Found');
      }

      const updatedData = {
        route_id,
        order,
        name,
        latitude,
        longitude,
      };

      const updatedStop = await existingStop.save(updatedData, { method: 'update', patch: true });

      return StopDTO.fromStopEntity(updatedStop.attributes);
    } catch (error) {
      throw Boom.badImplementation('Error Updating Stop', error);
    }
  }

  async delete(id) {
    try {
      const stop = await Stop.where({ id, is_deleted: 0 }).fetch({ require: false });
      if (!stop) {
        throw Boom.notFound('Stop Not Found');
      }
      await stop.save({ is_deleted: 1 }, { method: 'update', patch: true });
      return {
        success: true,
      };
    } catch (error) {
      logger.error('Error Deleting Route', error);
      throw Boom.internal('Internal Server Error');
    }
  }
}

export default new StopService();
