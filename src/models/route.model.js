import bookshelf from '../config/bookshelf';
import Stop from './stop.model';
const TABLE_NAME = 'routes';

/**
 * User Model.
 */
class Route extends bookshelf.Model {
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

  stops() {
    return this.hasMany(Stop, 'route_id');
  }

  users() {
    return this.belongsTo(User, 'user_id');
  }
}

export default Route;
