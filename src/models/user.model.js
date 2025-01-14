import bookshelf from '../config/bookshelf';
import Message from './message.model';

const TABLE_NAME = 'users';

/**
 * User Model.
 */
class User extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }

  /**
   * Hide the fields in the response
   *
   * @returns {string[]}
   */
  get hidden() {
    return ['created_at', 'updated_at', 'password'];
  }

  /**
   * Define a relationship with the Message model
   *
   * @returns {Bookshelf.Model}
   */
  message() {
    return this.hasMany(Message);
  }
}

export default User;
