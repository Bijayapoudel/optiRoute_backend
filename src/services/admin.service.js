import Boom from '@hapi/boom';
import Admin from '../models/admin.model';
import bcrypt, { hash } from 'bcrypt';
import { generateToken } from '../utils/token';

class AdminService {
    async login(data) {
        const { email, password } = data;
        const admin = await Admin.where({ email }).fetch();

        if (!admin || !password) {
            throw Boom.unauthorized('Invalid Credentials');
        }

        const passwordMatch = await bcrypt.compare(password, admin.get('password'));
        if (passwordMatch) {
            const adminWithoutPassword = admin.omit(['password', 'created_at']);
            const token = generateToken(adminWithoutPassword.id);
            return { admin: adminWithoutPassword, token };
        } else {
            throw Boom.unauthorized('Invalid email or password'); // Fixed: throw the error properly
        }
    }

    async changePassword(data, adminData) {
        const { oldPassword, newPassword } = data;
        const admin = await Admin.where({ id: adminData.id }).fetch();

        if (!admin) {
            throw Boom.notFound('Admin Not Found!');
        }

        const passwordMatch = await bcrypt.compare(oldPassword, admin.get('password'));
        if (!passwordMatch) {
            throw Boom.unauthorized('Old password is incorrect!');
        }

        if (oldPassword === newPassword) {
            throw Boom.badRequest('New password must be different from the old password!');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        return admin.save({ password: hashedNewPassword });
    }

    async getAllAdmins(){
        return Admin.fetchAll();
    }

    async getAdminById(id){
        const admin=await Admin.where({id}).fetch();
        if(!admin){
            throw Boom.notFound('Admin Not Found!');
        }
        return admin;
    }

async createAdmin(data){
   const hashedPassword= await bcrypt.hash(data.password, 10);
   return new Admin({...data, password: hashedPassword}).save();
}

async updateAdmin(id, data){
    const admin=await Admin.where({id}).fetch();
    if(!admin){
        throw Boom.notFound('Admin Not Found!');
    }
    if(data.password){
        data.password=await bcrypt.hash(data.password, 10);
    }
    return admin.save(data);
}

async deleteAdmin(id){
    const admin=await Admin.where({id}).fetch();
    if(!admin){
        throw Boom.notFound('Admin Not Found!');
    }
    return admin.destroy();
}
}

export default new AdminService();
