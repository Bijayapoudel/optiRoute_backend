// import express from 'express';
// import DeliveryController from '../controllers/delivery.controller';
// import validate from '@config/joi.validate';
// import deliverySchema from '../validators/delivery.validator';
// import isAdmin from '../middlewares/isAdmin';

// const router=express.Router();

// router.route('/').post(isAdmin, validate(deliverySchema.store), DeliveryController.store );

// router.route('/:id').get(isAdmin, DeliveryController.findById);

// router.route('/').get(isAdmin, DeliveryController.findAll);

// router.route('/:id').put(isAdmin, validate(deliverySchema.update), DeliveryController.update);

// router.route('/:id').delete(isAdmin, DeliveryController.destroy);

// export default router;


import express from 'express';
import DeliveryController from '../controllers/delivery.controller';
import validate from '@config/joi.validate';
import deliverySchema from '../validators/delivery.validator';
import isAdmin from '../middlewares/isAdmin';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Delivery
 *     description: Delivery Operations
 */

/**
 * @swagger
 * definitions:
 *   Delivery:
 *     type: object
 *     properties:
 *       stop_id:
 *         type: integer
 *         description: ID of the stop in the delivery route
 *         example: 2
 *       status:
 *         type: string
 *         description: Status of the delivery
 *         example: postponed
 *       note:
 *         type: string
 *         description: Additional notes regarding the delivery
 *         example: It is the required note
 *       ratings:
 *         type: integer
 *         description: Ratings for the delivery experience
 *         example: 1
 *       created_at:
 *         type: string
 *         format: date-time
 *         description: Delivery creation datetime
 *       updated_at:
 *         type: string
 *         format: date-time
 *         description: Delivery update datetime
 */

/**
 * @swagger
 * /v1/delivery:
 *   post:
 *     tags:
 *       - Delivery
 *     summary: Create a new delivery entry
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Delivery creation request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Delivery"
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
 *               $ref: '#/definitions/Delivery'
 *             message:
 *               type: string
 *               example: Delivery Created Successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').post(isAdmin, validate(deliverySchema.store), DeliveryController.store);

/**
 * @swagger
 * /v1/delivery/{id}:
 *   get:
 *     tags:
 *       - Delivery
 *     summary: Get a delivery by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the delivery to retrieve
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
 *               $ref: '#/definitions/Delivery'
 *             message:
 *               type: string
 *               example: Delivery retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Delivery not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').get(isAdmin, DeliveryController.findById);

/**
 * @swagger
 * /v1/deliveries:
 *   get:
 *     tags:
 *       - Delivery
 *     summary: List all deliveries
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
 *                 $ref: '#/definitions/Delivery'
 *             message:
 *               type: string
 *               example: Deliveries retrieved successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/').get(isAdmin, DeliveryController.findAll);

/**
 * @swagger
 * /v1/delivery/{id}:
 *   put:
 *     tags:
 *       - Delivery
 *     summary: Update an existing delivery
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the delivery to update
 *         schema:
 *           type: integer
 *       - name: body
 *         in: body
 *         description: Delivery update request
 *         required: true
 *         schema:
 *           $ref: "#/definitions/Delivery"
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
 *               $ref: '#/definitions/Delivery'
 *             message:
 *               type: string
 *               example: Delivery updated successfully
 *       400:
 *         description: Validation error
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Delivery not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').put(isAdmin, validate(deliverySchema.update), DeliveryController.update);

/**
 * @swagger
 * /v1/delivery/{id}:
 *   delete:
 *     tags:
 *       - Delivery
 *     summary: Delete a delivery
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the delivery to delete
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
 *               example: Delivery deleted successfully
 *       401:
 *         description: Unauthorized
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Delivery not found
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.route('/:id').delete(isAdmin, DeliveryController.destroy);

export default router;
