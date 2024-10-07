export class RouteDTO {
    constructor({ id, admin_id, user_id, name, note, optimize_mode, travel_mode, is_optimized, created_at, updated_at }) {
      this.id = id;
      this.admin_id = admin_id;
      this.user_id = user_id;
      this.name = name;
      this.note = note;
      this.optimize_mode = optimize_mode;
      this.travel_mode = travel_mode;
      this.is_optimized = is_optimized;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    /**
     * Static method to create an instance of RouteDTO from a Route entity.
     *
     * @param {object} routeEntity - The Route entity from the database.
     * @returns {RouteDTO} - An instance of RouteDTO.
     */
    static fromRouteEntity(routeEntity) {
      return new RouteDTO({
        id: routeEntity.id,
        admin_id: routeEntity.admin_id,
        user_id: routeEntity.user_id,
        name: routeEntity.name,
        note: routeEntity.note,
        optimize_mode: routeEntity.optimize_mode,
        travel_mode: routeEntity.travel_mode,
        is_optimized: routeEntity.is_optimized,
        created_at: routeEntity.created_at,
        updated_at: routeEntity.updated_at,
      });
    }
  }
  