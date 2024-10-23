export class DeliveryDTO {
    constructor({ id, stop_id, status, note, ratings,  created_at, updated_at }) {
      this.id = id;
      this.stop_id = stop_id;
      this.status = status;
      this.note = note;
      this.ratings = ratings;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    static fromDeliveryEntity(deliveryEntity) {
      return new DeliveryDTO({
        id: deliveryEntity.id,
        stop_id:deliveryEntity.stop_id,
        status: deliveryEntity.status,
        note: deliveryEntity.note,
        ratings: deliveryEntity.ratings,
        created_at: deliveryEntity.created_at,
        updated_at: deliveryEntity.updated_at,
      });
    }
  }
  