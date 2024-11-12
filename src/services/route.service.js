import Boom from '@hapi/boom';
import Route from '../models/route.model'; // Adjust the import path as necessary
import Stop from '../models/stop.model';
import { RouteDTO } from '../dtos/routeDTO'; // Adjust the import path as necessary
import logger from '../config/winston';

class RouteService {
  // Get all routes
  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const routeData = await Route.query(queryBuilder).fetchAll({
        withRelated: ['stops'],
      });

      if (!routeData) return []; // If no routes are found, return an empty array

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

  // Get one route by ID
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

  // Get all user routes
  async getAllByUserId(user_id, page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.where('user_id', '=', user_id);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const routeData = await Route.query(queryBuilder).fetchAll({
        withRelated: ['stops'],
      });

      if (!routeData) return []; // Return an empty array if no routes are found

      const formattedRoutes = routeData.toJSON().map((route) => ({
        id: route.id,
        admin_id: route.admin_id,
        user_id: route.user_id, // Ensure this exists in your Route model
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

      return formattedRoutes; // Return the formatted user routes
    } catch (error) {
      throw Boom.badImplementation('Error fetching user routes', error);
    }
  }

  async getAllByAdminId(admin_id, page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.where('admin_id', '=', admin_id);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const routeData = await Route.query(queryBuilder).fetchAll({
        withRelated: ['stops'],
      });
      if (!routeData) return [];

      const formattedRoutes = routeData.toJSON().map((route) => ({
        id: route.id,
        admin_id: route.admin_id,
        user_id: route.user_id,
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
      return formattedRoutes;
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Routes by Admin', error);
    }
  }

  // Get one user route by ID
  async getOneUserRoute(id) {
    try {
      const route = await Route.where({ id, is_deleted: 0 }).fetch({
        withRelated: ['stops', 'users'],
      });

      if (!route) {
        throw Boom.notFound('Route Not Found!');
      }

      const routeData = route.toJSON();

      // Format the response to include stops
      const responseData = {
        id: route.id,
        user_id: routeData.user_id, // Ensure this exists in your Route model
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

      return responseData; // Return the formatted user route data
    } catch (error) {
      throw Boom.badImplementation('Error Fetching User Route', error);
    }
  }

  async store(routeData) {
    try {
      const { admin_id, user_id, name, date, note, stops } = routeData;

      // Step 1: Insert the new route into the route table
      const route = await new Route({
        admin_id,
        user_id,
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
    const { admin_id, user_id, name, date, note, stops } = routeData;
    try {
      const existingRoute = await Route.where({ id, is_deleted: 0 }).fetch();

      if (!existingRoute) {
        throw Boom.notFound('Route Not Found');
      }

      // Update the route details
      existingRoute.set({ admin_id, user_id, name, date, note });
      await existingRoute.save();

      // Step 1: Delete existing stops
      await Stop.where({ route_id: id }).delete();

      // Step 2: Prepare stops data for insertion into the stops table
      const stopsData = stops.map((stop, index) => ({
        route_id: id,
        order: index + 1,
        name: stop.name,
        address: stop.address,
        latitude: stop.latitude,
        longitude: stop.longitude,
      }));

      // Step 3: Insert new stops data into the stops table
      await Stop.query().insert(stopsData);

      // Return success message
      return {
        message: 'Route updated successfully',
      };
    } catch (error) {
      logger.error('Error Updating Route', error);
      throw Boom.badImplementation('Error Updating the route', error);
    }
  }

  async destroy(id) {
    try {
      const existingRoute = await Route.where({ id }).fetch();

      if (!existingRoute) {
        throw Boom.notFound('Route Not Found');
      }

      // Soft delete the route
      existingRoute.set({ is_deleted: 1 });
      await existingRoute.save();

      return { message: 'Route deleted successfully' };
    } catch (error) {
      logger.error('Error Deleting Route', error);
      throw Boom.badImplementation('Error Deleting the route', error);
    }
  }
}

export default new RouteService();
