import Boom from '@hapi/boom';
import Route from '../models/route.model'; // Adjust the import path as necessary
import Stop from '../models/stop.model';
import { RouteDTO } from '../dtos/routeDTO'; // Adjust the import path as necessary
import logger from '../config/winston';

class RouteService {
  // async getAll(page, pageSize) {
  //   const offset = (page - 1) * pageSize;

  //   const queryBuilder = (qb) => {
  //     qb.orderBy('id', 'DESC');
  //     qb.where('is_deleted', '=', 0); // Fetch only non-deleted routes
  //     qb.limit(pageSize);
  //     qb.offset(offset);
  //   };

  //   try {
  //     const routeData = await Route.query(queryBuilder).fetchAll();

  //     if (!routeData) return []; // If no routes are found, return an empty array

  //     // Convert to RouteDTO instances
  //     const routeCollection = routeData.toJSON();
  //     const routeDTOs = routeCollection.map((route) => RouteDTO.fromRouteEntity(route));

  //     return routeDTOs; // Return the array of RouteDTOs
  //   } catch (error) {
  //     throw Boom.badImplementation('Error fetching routes', error); // Use Boom for error handling
  //   }
  // }

  // async getOne(id) {
  //   try {
  //     const route = await Route.query().where({ id, is_deleted: 0 }).first();
  //     if (!route) throw Boom.notFound('Route Not Found!');

  //     return RouteDTO.fromRouteEntity(route);
  //   } catch (error) {
  //     throw Boom.badImplementation('Error Fetching Route', error);
  //   }
  // }

  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0); // Fetch only non-deleted routes
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const routeData = await Route.query(queryBuilder).fetchAll({ withRelated: ['stops'] });

      if (!routeData) return []; // If no routes are found, return an empty array

      // Convert to JSON and format the response to include stops
      const formattedRoutes = routeData.toJSON().map((route) => ({
        id: route.id,
        admin_id: route.admin_id,
        name: route.name,
        note: route.note,
        created_at: route.created_at,
        updated_at: route.updated_at,
        stops: route.stops.map((stop) => ({
          address: stop.address,
          latitude: stop.latitude,
          longitude: stop.longitude,
          name: stop.name,
        })),
      }));

      return formattedRoutes; // Return the formatted routes
    } catch (error) {
      throw Boom.badImplementation('Error fetching routes', error); // Use Boom for error handling
    }
  }

  async getOne(id) {
    try {
      const route = await Route.where({ id, is_deleted: 0 }).fetch({ withRelated: ['stops'] });

      if (!route) {
        throw Boom.notFound('Route Not Found!');
      }

      const routeData = route.toJSON();

      // Format the response to include stops
      const responseData = {
        id: route.id,
        admin_id: routeData.admin_id,
        name: routeData.name,
        note: routeData.note,
        created_at: routeData.created_at,
        updated_at: routeData.updated_at,
        stops: routeData.stops.map((stop) => ({
          address: stop.address,
          latitude: stop.latitude,
          longitude: stop.longitude,
          name: stop.name,
        })),
      };

      return responseData; // Return the formatted route data
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Route', error);
    }
  }

  async store(routeData) {
    try {
      const { admin_id, name, date, note, stops } = routeData;

      // Step 1: Insert the new route into the route table
      const route = await new Route({
        admin_id,
        name,
        date,
        note,
        is_deleted: 0, // Default to not deleted
      }).save();

      const routeId = route.get('id');

      // Step 2: Prepare stops data for insertion into the stops table
      const stopsData = stops.map((stop, index) => ({
        route_id: routeId,
        order: index + 1,
        name: stop.name,
        address: stop.address, // Assuming you want to use the address as the stop name
        latitude: stop.latitude,
        longitude: stop.longitude,
      }));

      // Step 3: Insert stops data into the stops table
      await Stop.query().insert(stopsData);

      // Step 4: Return the success message and the newly created route
      return {
        message: 'Route and stops inserted successfully',
        route: RouteDTO.fromRouteEntity(route.attributes),
      };
    } catch (error) {
      logger.error('Error Creating Route', error);
      throw Boom.badImplementation('Error Creating the route', error);
    }
  }

  async update(id, routeData) {
    const { admin_id, name, date, note, stops } = routeData;
    try {
      const existingRoute = await Route.where({ id, is_deleted: 0 }).fetch({ require: false });
      if (!existingRoute) {
        throw Boom.notFound('Route Not Found!');
      }
      const updatedData = {
        admin_id,
        name,
        date,
        note,
      };
      const updatedRoute = await existingRoute.save(updatedData, { method: 'update', patch: true });

      await Stop.query().where({ route_id: id }).delete();

      const stopsData = stops.map((stop, index) => ({
        route_id: id,
        order: index + 1,
        name: stop.name,
        address: stop.address,
        latitude: stop.latitude,
        longitude: stop.longitude,
      }));
      await Stop.query().insert(stopsData);
      return RouteDTO.fromRouteEntity(updatedRoute.attributes);
    } catch (error) {
      if (error.isBoom) {
        throw error;
      }
      logger.error('Error Updating Route: ', error);
      throw Boom.internal('Internal Server Error');
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
