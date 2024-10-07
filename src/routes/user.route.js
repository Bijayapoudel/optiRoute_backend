import express from 'express';
import UserController from '../controllers/user.controller';
import validate from '@config/joi.validate';
import isAdmin from '../middlewares/isAdmin';
import isSuperAdmin from '../middlewares/isSuperAdmin';

const router=express.Router();

router.route('/').post(isAdmin, UserController.store);

router.route('/').get(isAdmin, UserController.findAll);

router.route('/:id').get(isAdmin, UserController.findById);

router.route('/:id').put(isAdmin, UserController.update);

router.route('/:id').delete(isAdmin, isSuperAdmin, UserController.destroy);


export default router;
