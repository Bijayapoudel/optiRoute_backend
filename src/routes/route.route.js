import express from 'express';
import RouteController from '../controllers/route.controller';
import validate from '@config/joi.validate';
import routeSchema from '../validators/route.validator';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  - name: Route
 *    description: Route Operations
 */

/**
 * @swagger
 * definitions:
 *   Route:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         description: Unique identifier for a specific route
 *         example: 1
 *       admin_id:
 *         type: integer
 *         description: ID of the admin who created the route
 *         example: 1
 *       user_id:
 *         type: integer
 *         description: ID of the user assigned to the route
 *         example: 3
 *       name:
 *         type: string
 *         description: Name of the route
 *         example: Morning Commute
 *       note:
 *         type: string
 *         description: Additional notes for the route
 *         example: This route covers the main highways
 *       optimize_mode:
 *         type: string
 *         description: Optimization mode for the route
 *         example: shortest
 *       travel_mode:
 *         type: string
 *         description: Travel mode for the route
 *         example: driving
 *       is_optimized:
 *         type: integer
 *         description: Indicates if the route is optimized
 *         example: 0
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Route creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Route update datetime
 */

/**
 * @swagger
 * /v1/route:
 *   post:
 *     tags:
 *       - Route
 *     summary: Create a new route
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Route creation request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Route"
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
 *               $ref: '#/definitions/Route'
 *             message:
 *               type: string
 *               example: Route Created Successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').post(isAdmin, validate(routeSchema.store), RouteController.store);

/**
 * @swagger
 * /v1/route/{id}:
 *   get:
 *     tags:
 *       - Route
 *     summary: Get a route by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the route to retrieve
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
 *               $ref: '#/definitions/Route'
 *             message:
 *               type: string
 *               example: Route retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Route not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').get(isAdmin, RouteController.findById);



/**
 * @swagger
 * /v1/routes:
 *   get:
 *     tags:
 *       - Route
 *     summary: List all routes
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
 *                 $ref: '#/definitions/Route'
 *             message:
 *               type: string
 *               example: Routes retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.route('/').get(isAdmin, RouteController.findAll);




/**
 * @swagger
 * /v1/route/{id}:
 *   put:
 *     tags:
 *       - Route
 *     summary: Update an existing route
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the route to update
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Route update request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Route"
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
 *               $ref: '#/definitions/Route'
 *             message:
 *               type: string
 *               example: Route updated successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Route not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').put(isAdmin, validate(routeSchema.update), RouteController.update);

/**
 * @swagger
 * /v1/route/{id}:
 *   delete:
 *     tags:
 *       - Route
 *     summary: Delete a route
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the route to delete
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
 *               example: Route deleted successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Route not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').delete(isAdmin, RouteController.destroy);

export default router;
