import bookshelf from '../config/bookshelf';
import User from './user.model';

const TABLE_NAME = 'user_messages';

/**
 * user_message model
 */
class UserMessage extends bookshelf.Model {
  /**
   * Get table name
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Define a relationship with the User Model
   *
   * @returns {Bookshelf.Model}
   */
  user() {
    return this.belongsTo(User);
  }

  /**
   * Override the fetch method to exclude soft-deleted records
   *
   * @param {object} options
   * @returns {Promise}
   */
  fetch(options) {
    options = options || {};
    options.where = options.where || {};
    options.where.is_deleted = false;
    return super.fetch(options);
  }

  /**
   * Override the fetchAll method to exclude soft-deleted records
   *
   * @param {object} options
   * @returns {Promise}
   */
  fetchAll(options) {
    options = options || {};
    options.where = options.where || {};
    options.where.is_deleted = false;
    return super.fetchAll(options);
  }

  /**
   * Soft delete a record
   *
   * @param {object} options
   * @returns {Promise}
   */
  softDelete(options) {
    return this.save({ is_deleted: true }, { patch: true, ...options });
  }
}

export default UserMessage;
