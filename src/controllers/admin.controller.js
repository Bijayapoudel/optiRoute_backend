import HttpStatus from 'http-status-codes';
import { successResponse } from '../utils/response';
import adminService from '../services/admin.service';

class AdminController {
  async adminLogin(req, res, next) {
    try {
      const data = await adminService.login(req.body);
      successResponse(res, data, HttpStatus.OK, 'Admin Logged in successfully!');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      await adminService.changePassword(req.body, req.currentAdmin);
      successResponse(res, null, HttpStatus.OK, 'Password Changed Successfully!');
    } catch (error) {
      next(error);
    }
  }

  async listAdmins(req, res, next) {
    try {
      const data = await adminService.getAllAdmins();
      successResponse(res, data, HttpStatus.OK, 'Admins Retrieved Successfully!');
    } catch (error) {
      next(error);
    }
  }

  async getAdmin(req, res, next) {
    try {
      const data = await adminService.getAdminById(req.params.id);
      successResponse(res, data, HttpStatus.OK, 'Admin Retrieved Successfully!');
    } catch (error) {
      next(error);
    }
  }

  async createAdmin(req, res, next) {
    try {
      const data = await adminService.createAdmin(req.body);
      successResponse(res, data, HttpStatus.CREATED, 'Admin Created Successfully!');
    } catch (error) {
        next(error);
    }
  }

  async updateAdmin(req, res, next) {
    try {
      const data = await adminService.updateAdmin(req.params.id, req.body);
      successResponse(res, data, HttpStatus.OK, 'Admin Updated Successfully!');
    } catch (error) {
      next(error);
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      await adminService.deleteAdmin(req.params.id);
      successResponse(res, null, HttpStatus.OK, 'Admin Deleted Successfully!');
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();