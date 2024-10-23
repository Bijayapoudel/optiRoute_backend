import Boom from '@hapi/boom';
import Route from '../models/route.model'; // Adjust the import path as necessary
import { RouteDTO } from '../dtos/routeDTO'; // Adjust the import path as necessary
import logger from '../config/winston';

class RouteService {
  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0); // Fetch only non-deleted routes
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const routeData = await Route.query(queryBuilder).fetchAll();

      if (!routeData) return routeData; // If no routes are found, return null or an empty array

      // Convert to RouteDTO instances
      const routeCollection = routeData.toJSON();
      const routeDTOs = routeCollection.map((route) => RouteDTO.fromRouteEntity(route));

      return routeDTOs; // Return the array of RouteDTOs
    } catch (error) {
      throw Boom.badImplementation('Error fetching routes', error); // Use Boom for error handling
    }
  }

  async getOne(id) {
    try {
      const route = await Route.query().where({ id, is_deleted: 0 }).first();
      if (!route) throw Boom.notFound('Route Not Found!');

      return RouteDTO.fromRouteEntity(route);
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Route', error);
    }
  }

  async store(routeData) {
    try {
      const { admin_id, user_id, name, note, optimize_mode, travel_mode } = routeData;
      return new Route({
        admin_id,
        user_id,
        name,
        note,
        optimize_mode,
        travel_mode,
        is_deleted: 0, // Default to not deleted
      })
        .save()
        .then((route) => RouteDTO.fromRouteEntity(route.attributes))
        .catch((error) => {
          logger.error('Error Creating Route', error);
          throw Boom.internal('Internal Server Error');
        });
    } catch (error) {
      throw Boom.badImplementation('Error Creating the route', error);
    }
  }

  async update(id, routeData) {
    const { admin_id, user_id, name, note, optimize_mode, travel_mode, is_optimized } = routeData;

    try {
      // Fetch the route
      const existingRoute = await Route.where({ id, is_deleted: 0 }).fetch({ require: false });

      if (!existingRoute) {
        throw Boom.notFound('Route not found.');
      }

      // Prepare data for update
      const updateData = {
        admin_id,
        user_id,
        name,
        note,
        optimize_mode,
        travel_mode,
        is_optimized,
      };

      // Update the route
      const updatedRoute = await existingRoute.save(updateData, { method: 'update', patch: true });

      // Return the updated route data using DTO
      return RouteDTO.fromRouteEntity(updatedRoute.attributes);
    } catch (error) {
      if (error.isBoom) {
        throw error; // Pass through Boom errors
      }
      logger.error('Error updating route:', error);
      throw Boom.internal('Internal server error');
    }
  }

  async delete(id) {
    try {
      // Fetch the route
      const route = await Route.where({ id, is_deleted: 0 }).fetch({ require: false });

      if (!route) {
        throw Boom.notFound('Route not found.');
      }

      // Mark the route as deleted
      await route.save({ is_deleted: 1 }, { method: 'update', patch: true });

      // Return a success response
      return {
        success: true,
      };
    } catch (error) {
      if (error.isBoom) {
        throw error; // Pass through Boom errors
      }
      logger.error('Error deleting route:', error);
      throw Boom.internal('Internal server error');
    }
  }
}

export default new RouteService();
