export class StopDTO {
  constructor({ id, route_id, name, order, latitude, longitude, created_at, updated_at }) {
    this.id = id;
    this.route_id = route_id;
    this.name = name;
    this.order = order;
    this.latitude = latitude;
    this.longitude = longitude;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromStopEntity(stopEntity) {
    return new StopDTO({
      id: stopEntity.id,
      route_id:stopEntity.route_id,
      name: stopEntity.name,
      order: stopEntity.order,
      latitude: stopEntity.latitude,
      longitude: stopEntity.longitude,
      created_at: stopEntity.created_at,
      updated_at: stopEntity.updated_at,
    });
  }
}
