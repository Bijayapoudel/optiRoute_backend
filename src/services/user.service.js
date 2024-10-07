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
        password: hashedPassword
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
    try {
      const user = await User.query().where({ id, is_deleted: false }).first();
      if (!user) throw Boom.notFound('User Not Found!');

      const updatedData={
        admin_id,
        name,
        phone_number,
        email,
        address
      }
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      return user.save(updatedData,{patch:true})
      .then((updatedUser)=> UserDTO.fromUserEntity(updatedUser.attributes))
      .catch((error)=>{
        logger.error('Error Updating User', error);
        throw Boom.internal('Internal Server Error');
      })
    } catch (error) {
      throw Boom.badImplementation('Error updating user', error);
    }
  }

  async delete(id) {
    try {
      const user = await User.query().where({ id, is_deleted: false }).first();

      if (!user) throw Boom.notFound('User Not Found');

      await User.query().patch({ is_deleted: true }).where({ id });

      return { message: 'User Deleted Successfully' };
    } catch (error) {
      throw Boom.badImplementation('Error Deleting user', error);
    }
  }
}

export default new UserService();
