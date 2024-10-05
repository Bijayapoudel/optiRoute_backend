import bookshelf from '../config/bookshelf';

const TABLE_NAME = 'admins';

/**
 * User Model.
 */
class Admin extends bookshelf.Model {
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
    return ['created_at'];
  }

  // /**
  //  * Hide the fields in the response
  //  *
  //  * @returns {string[]}
  //  */
  get hidden() {
    return ['created_at'];
  }
}

export default Admin;
