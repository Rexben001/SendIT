import express from 'express';
import parcelController from '../controllers/parcelControllers';
import userController from '../controllers/userControllers';
import validator from '../middlewares/validation';
import Auth from '../middlewares/auth';

const router = express.Router();

router.get('/parcels', Auth.verifyUser, parcelController.getParcels);
router.get('/parcels/:parcel_id', Auth.verifyUser, parcelController.getAParcel);
router.post('/parcels', validator.parcelValidator, Auth.verifyUser, parcelController.addParcelss);
router.put('/parcels/:parcel_id/cancel', Auth.verifyUser, parcelController.cancelParcel);
router.put('/parcels/:parcel_id/status', Auth.verifyUser, parcelController.changeStatus);
router.put('/parcels/:parcel_id/destination', Auth.verifyUser, parcelController.changeDestination);
router.put('/parcels/:parcel_id/presentLocation', Auth.verifyUser, parcelController.presentLocation);


router.get('/users', Auth.verifyUser, userController.getUsers);
router.post('/auth/signup', validator.userValidator, userController.addUser);
router.get('/users/:user_id/parcels', Auth.verifyUser, userController.userParcel);
router.post('/users/login', userController.loginUser);

export default router;
