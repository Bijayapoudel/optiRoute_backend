import express from 'express';
import adminRoute from './admin.route';
import userRoute from './user.route';
import routeRoute from './route.route';
import stopRoute from './stop.route';
import deliveryRoute from './delivery.route';
const router=express.Router();

router.use('/v1/admin',adminRoute);
router.use('/v1/user', userRoute);
router.use('/v1/route', routeRoute);
router.use('/v1/stop', stopRoute);
router.use('/v1/delivery', deliveryRoute);

export default router;