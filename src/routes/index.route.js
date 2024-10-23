import express from 'express';
import adminRoute from './admin.route';
import userRoute from './user.route';

const router=express.Router();

router.use('/v1/admin',adminRoute);
router.use('/v1/user', userRoute);

export default router;