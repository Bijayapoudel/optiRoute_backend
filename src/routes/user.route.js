import express from 'express';
import UserController from '../controllers/user.controller';
import validate from '@config/joi.validate';
import userSchema from '../validators/user.validator';
import isAdmin from '../middlewares/isAdmin';
import isSuperAdmin from '../middlewares/isSuperAdmin';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: User
 *    description: User Operations
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier for a specific user
 *         example: 1
 *       name:
 *         type: string
 *         description: Full name of the user
 *         example: King Poudel
 *       email:
 *         type: string
 *         description: Email of the user
 *         required: true
 *         example: swe@gmail.com
 *       phone_number:
 *         type: string
 *         description: Phone number of the user
 *         required: true
 *         example: '9832267890'
 *       address:
 *         type: string
 *         description: Address of the user
 *         example: tandi
 *       password:
 *         type: string
 *         description: Password of the user
 *         example: subu123
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: User creation datetime
 */

/**
 * @swagger
 * /v1/user:
 *   post:
 *     tags:
 *       - User
 *     summary: Create a new user
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: User creation request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
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
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *               example: User created successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').post(isAdmin, validate(userSchema.store), UserController.store);

/**
 * @swagger
 * /v1/user:
 *   get:
 *     tags:
 *       - User
 *     summary: List all users
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
 *                 $ref: '#/definitions/User'
 *             message:
 *               type: string
 *               example: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').get(isAdmin, UserController.findAll);

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     tags:
 *       - User
 *     summary: Get a user by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
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
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *               example: User retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').get(isAdmin, UserController.findById);

/**
 * @swagger
 * /v1/user/{id}:
 *   put:
 *     tags:
 *       - User
 *     summary: Update an existing user
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: User update request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/User"
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
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *               example: User updated successfully
 *       400:
 *         description: Validation error
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
router.route('/:id').put(isAdmin, validate(userSchema.update), UserController.update);

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
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
 *               example: User deleted successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: User not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').delete(isAdmin, UserController.destroy);

router.route('/login').post(isAdmin, UserController.login);

router.route('/users/:admin_id').get(UserController.getAllUsersOfAdmin);

export default router;
