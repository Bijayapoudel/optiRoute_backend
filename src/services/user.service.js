import Boom from '@hapi/boom';
import User from '../models/user.model';
import { UserDTO } from '../dtos/userDTO';
import bcrypt from 'bcrypt';
import logger from '../config/winston';
import { error } from 'winston';

class UserService {
  async getAll(page, pageSize) {
    const offset = (page - 1) * pageSize;

    const queryBuilder = (qb) => {
      qb.orderBy('id', 'DESC');
      qb.where('is_deleted', '=', 0);
      qb.limit(pageSize);
      qb.offset(offset);
    };

    try {
      const userData = await User.query(queryBuilder).fetchAll();

      if (!userData) return userData; // If no users are found, return null or an empty array

      // Convert to UserDTO instances
      const userCollection = userData.toJSON();
      const userDTOs = userCollection.map((user) => UserDTO.fromUserEntity(user));

      return userDTOs; // Return the array of UserDTOs
    } catch (error) {
      throw Boom.badImplementation('Error fetching users', error); // Use Boom for error handling
    }
  }

  async getOne(id) {
    try {
      const user = await User.query().where({ id, is_deleted: false }).first();
      if (!user) throw Boom.notFound('User Not Found!');

      return UserDTO.fromUserEntity(user);
    } catch (error) {
      throw Boom.badImplementation('Error Fetching Users', error);
    }
  }

  async store(userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const { admin_id, name, phone_number, email, address } = userData;
      return new User({
        admin_id,
        name,
        phone_number,
        email,
        address,
        password: hashedPassword,
      })
        .save()
        .then((user) => UserDTO.fromUserEntity(user.attributes))
        .catch((error) => {
          logger.error('Error Creating Users', error);
          throw Boom.internal('Internal Server Error');
        });
    } catch (error) {
      throw Boom.badImplementation('Error Creating the user', error);
    }
  }

  async update(id, userData) {
    const { admin_id, name, email, phone_number, address, password } = userData;

    try {
      // Fetch the user
      const existingUser = await User.where({ id, is_deleted: false }).fetch({ require: false });

      if (!existingUser) {
        throw Boom.notFound('User not found.');
      }

      // Prepare data for update
      const updateData = {
        admin_id,
        name,
        email,
        phone_number,
        address,
      };

      // If a password is provided, hash it before saving
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Update the user
      const updatedUser = await existingUser.save(updateData, { method: 'update', patch: true });

      // Return the updated user data using DTO
      return UserDTO.fromUserEntity(updatedUser.attributes);
    } catch (error) {
      if (error.isBoom) {
        throw error; // Pass through Boom errors
      }
      logger.error('Error updating user:', error);
      throw Boom.internal('Internal server error');
    }
  }

  async delete(id) {
    try {
      // Fetch the user
      const user = await User.where({ id, is_deleted: false }).fetch({ require: false });

      if (!user) {
          throw Boom.notFound('User not found.');
      }

      // Mark the user as deleted
      await user.save({ is_deleted: true }, { method: 'update', patch: true });

      // Return a success response
      return {
          success: true
      };
  } catch (error) {
      if (error.isBoom) {
          throw error; // Pass through Boom errors
      }
      logger.error('Error deleting user:', error);
      throw Boom.internal('Internal server error');
    }
  }
}
  
export default new UserService();
