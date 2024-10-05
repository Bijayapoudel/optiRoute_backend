import express from 'express';
import adminRoute from './admin.route';

const router=express.Router();

router.use('/v1/admin',adminRoute);


export default router;