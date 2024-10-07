 import express from 'express';
import AdminController from '../controllers/admin.controller';
import validate from '@config/joi.validate';
import adminSchema from '../validators/admin.validator';
import isAdmin from '../middlewares/isAdmin';
import isSuperAdmin from '../middlewares/isSuperAdmin';

const router= express.Router();



/**
 * @swagger
 * tags:
 *  - name: Admin
 *    description: Admin Operation
 */

/**
 * @swagger
 * definitions:
 *  Admin:
 *   type: object
 *   properties:
 *    id:
 *     type: integer
 *     description: Unique identifier for a sepcific admin
 *     example: 1
 *    name:
 *     type: string
 *     description: first name of an admin
 *     example: Bijay Poudel
 *    email:
 *     type: string
 *     description: email of an admin
 *     required: true
 *     example: poudelbijaya25@gmail.com
 *    password:
 *     type: string
 *     description: password of an admin
 *     example: bijju123
 *    role:
 *     type: string
 *     description: role defined for admin
 *     enum:
 *      - '0'
 *      - '1'
 *      - '2'
 *      - '3'
 *     example: '0'
 *    status:
 *     type: string
 *     description: status of  admin
 *     enum:
 *      - '0'
 *      - '1'
 *     example: '0'
 *     created_at:
 *      type: string
 *      format: date-time
 *      description: Admin creation datetime
 */

/**
 * @swagger
 * definitions:
 *   AdminLogin:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         description: Email of the admin
 *         required: true
 *         example: poudelbijaya25@gmail.com
 *       password:
 *         type: string
 *         description: Password of the admin
 *         required: true
 *         example: bijju123
 */

/**
 * @swagger
 * /v1/admin/login:
 *   post:
 *     tags:
 *       - Admin
 *     summary: "Admin login"
 *     security:
 *       - Bearer: []
 *     operationId: loginAdmin
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Admin login credentials
 *         required: true
 *         schema:
 *           $ref: "#/definitions/AdminLogin"
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               type: object
 *               properties:
 *                admin:
 *                 $ref: "#/definitions/Admin"
 *                token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNzI4NDU5MCwiZXhwIjoxNzA3Mjg2MzkwfQ.7gJKVn2qGaqU3r2ohFYPNRh_nSIrDCGxnHnqyb-QJKo
 *             message:
 *               type: string
 *               example: Admin logged in successfully !
 *       400:
 *         description: ValidationError
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.route('/login').post(validate(adminSchema.adminLogin), AdminController.adminLogin);



/**
 * @swagger
 * /v1/admin/change-password:
 *   patch:
 *     tags:
 *       - Admin
 *     summary: "Change password for an admin"
 *     security:
 *       - Bearer: []  # This indicates that Bearer Authentication is required
 *     operationId: changeAdminPassword
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Admin change password request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             oldPassword:
 *               type: string
 *               description: Old password of the admin
 *               required: true
 *               example: bijju123123
 *             newPassword:
 *               type: string
 *               description: New password of the admin
 *               required: true
 *               example: bijju456
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             message:
 *               type: string
 *               default: Password changed successfully
 *       400:
 *         description: ValidationError
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized - No token provided
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Admin not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/change-password').patch(isAdmin, AdminController.changePassword);


/**
 * @swagger
 * /v1/admin:
 *   get:
 *     tags:
 *       - Admin
 *     summary: List all admins
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Admin'
 *             message:
 *               type: string
 *               example: Admins retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').get(isAdmin, isSuperAdmin, AdminController.listAdmins);


/**
 * @swagger
 * /v1/admin/{id}:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get an admin by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the admin to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               $ref: '#/definitions/Admin'
 *             message:
 *               type: string
 *               example: Admin retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Admin not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').get(isAdmin, isSuperAdmin, AdminController.getAdmin);

/**
 * @swagger
 * /v1/admin:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Create a new admin
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Admin creation request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Full name of the admin
 *               required: true
 *               example: Bijay Poudel
 *             email:
 *               type: string
 *               description: Email of the admin
 *               required: true
 *               example: poudelbijaya25@gmail.com
 *             password:
 *               type: string
 *               description: Password of the admin
 *               required: true
 *               example: bijju123
 *             phone_number:
 *               type: string
 *               description: Phone number of the admin
 *               required: true
 *               example: '+9779816221701'
 *             role:
 *               type: string
 *               description: Role defined for admin
 *               enum:
 *                 - '0'
 *                 - '1'
 *                 - '2'
 *                 - '3'
 *               example: '0'
 *             status:
 *               type: string
 *               description: Status of the admin
 *               enum:
 *                 - '0'
 *                 - '1'
 *               example: '0'
 *     responses:
 *       201:
 *         description: Created
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               $ref: '#/definitions/Admin'
 *             message:
 *               type: string
 *               example: Admin created successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').post(isAdmin, isSuperAdmin, validate(adminSchema.createAdmin),AdminController.createAdmin);



/**
 * @swagger
 * /v1/admin/{id}:
 *   put:
 *     tags:
 *       - Admin
 *     summary: Update an existing admin
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the admin to update
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Admin update request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Full name of the admin
 *               required: true
 *               example: Bijju Poudel
 *             email:
 *               type: string
 *               description: Email of the admin
 *               required: true
 *               example: bijju12@gmail.com
 *             password:
 *               type: string
 *               description: Password of the admin
 *               example: bijju12345
 *             phone_number:
 *               type: string
 *               description: Phone number of the admin
 *               example: '+9779816221567'
 *             role:
 *               type: string
 *               description: Role defined for admin
 *               enum:
 *                 - '0'
 *                 - '1'
 *                 - '2'
 *                 - '3'
 *               example: '0'
 *             status:
 *               type: string
 *               description: Status of the admin
 *               enum:
 *                 - '0'
 *                 - '1'
 *               example: '0'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             data:
 *               $ref: '#/definitions/Admin'
 *             message:
 *               type: string
 *               example: Admin updated successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Admin not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.route('/:id').put(isAdmin, isSuperAdmin, validate(adminSchema.updateAdmin), AdminController.updateAdmin);

/**
 * @swagger
 * /v1/admin/{id}:
 *   delete:
 *     tags:
 *       - Admin
 *     summary: Delete an admin
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the admin to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               default: true
 *             message:
 *               type: string
 *               example: Admin deleted successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Admin not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').delete(isAdmin, isSuperAdmin, AdminController.deleteAdmin);


export default router;

