import express from 'express';
import StopController from '../controllers/stop.controller';
import validate from '@config/joi.validate';
import stopSchema from '../validators/stop.validator';
import isAdmin from '../middlewares/isAdmin';
import isSuperAdmin from '../middlewares/isSuperAdmin';
const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Stop
 *    description: Stop Operations
 */

/**
 * @swagger
 * definitions:
 *   Stop:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier for a specific stop
 *         example: 3
 *       route_id:
 *         type: integer
 *         description: The ID of the route the stop belongs to
 *         example: 1
 *       order:
 *         type: integer
 *         description: The order of the stop in the route
 *         example: 2
 *       name:
 *         type: string
 *         description: Name of the stop
 *         example: Bijju
 *       latitude:
 *         type: string
 *         description: The latitude of the stop's location
 *         example: "12.32"
 *       longitude:
 *         type: string
 *         description: The longitude of the stop's location
 *         example: "22.33"
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Stop creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Stop update datetime
 */

/**
 * @swagger
 * /v1/stops:
 *   post:
 *     tags:
 *       - Stop
 *     summary: Create a new stop
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Stop creation request
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             route_id:
 *               type: integer
 *               description: The ID of the route the stop belongs to
 *               example: 1
 *             order:
 *               type: integer
 *               description: The order of the stop in the route
 *               example: 2
 *             name:
 *               type: string
 *               description: Name of the stop
 *               example: Bijju
 *             latitude:
 *               type: string
 *               description: The latitude of the stop's location
 *               example: "12.32"
 *             longitude:
 *               type: string
 *               description: The longitude of the stop's location
 *               example: "22.33"
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
 *               $ref: '#/definitions/Stop'
 *             message:
 *               type: string
 *               example: Stop Created Successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').post(isAdmin, validate(stopSchema.store), StopController.store);

/**
 * @swagger
 * /v1/stops/{id}:
 *   get:
 *     tags:
 *       - Stop
 *     summary: Get a stop by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the stop to retrieve
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
 *               $ref: '#/definitions/Stop'
 *             message:
 *               type: string
 *               example: Stop retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Stop not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').get(isAdmin, StopController.findById);

/**
 * @swagger
 * /v1/stops:
 *   get:
 *     tags:
 *       - Stop
 *     summary: List all stops
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
 *                 $ref: '#/definitions/Stop'
 *             message:
 *               type: string
 *               example: Stops retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').get(isAdmin, StopController.findAll);

/**
 * @swagger
 * /v1/stops/{id}:
 *   put:
 *     tags:
 *       - Stop
 *     summary: Update an existing stop
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the stop to update
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Stop update request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Stop"
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
 *               $ref: '#/definitions/Stop'
 *             message:
 *               type: string
 *               example: Stop updated successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Stop not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').put(isAdmin, validate(stopSchema.update), StopController.update);

/**
 * @swagger
 * /v1/stops/{id}:
 *   delete:
 *     tags:
 *       - Stop
 *     summary: Delete a stop
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the stop to delete
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
 *               example: Stop deleted successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Stop not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').delete(isAdmin, isSuperAdmin, StopController.destroy);

export default router;
