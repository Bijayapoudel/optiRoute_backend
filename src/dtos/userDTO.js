export class UserDTO {
    constructor({ id, admin_id, name, phone_number, email, address, password, created_at, updated_at }) {
      this.id = id;
      this.admin_id = admin_id;
      this.name = name;
      this.phone_number = phone_number;
      this.email = email;
      this.address = address;
      this.password = password;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  
    /**
     * Static method to create an instance of UserDTO from a User entity.
     *
     * @param {object} userEntity - The User entity from the database.
     * @returns {UserDTO} - An instance of UserDTO.
     */
    static fromUserEntity(userEntity) {
      return new UserDTO({
        id: userEntity.id,
        admin_id: userEntity.admin_id,
        name: userEntity.name,
        phone_number: userEntity.phone_number,
        email: userEntity.email,
        address: userEntity.address,
        password: userEntity.password,
        created_at: userEntity.created_at,
        updated_at: userEntity.updated_at,
      });
    }
  }
  