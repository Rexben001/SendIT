import express from 'express';
import parcelController from '../controllers/parcelControllers';
import userController from '../controllers/userControllers';
import validator from '../middlewares/validation';
import Auth from '../middlewares/auth';



const router = express.Router();

router.get('/api/v1/parcels', parcelController.getParcels);
router.get('/api/v1/parcels/:parcel_id', parcelController.getAParcel);
router.post('/api/v1/parcels',validator.parcelValidator, Auth.verifyUser, parcelController.addParcelss);
router.put('/api/v1/parcels/:parcel_id/cancel', Auth.verifyUser, parcelController.cancelParcel);
router.put('/api/v1/parcels/:parcel_id/status', Auth.verifyUser, parcelController.changeStatus);
router.put('/api/v1/parcels/:parcel_id/destination', Auth.verifyUser, parcelController.changeDestination);
router.put('/api/v1/parcels/:parcel_id/presentLocation', parcelController.presentLocation);


router.get('/api/v1/users', userController.getUsers);
router.post('/api/v1/auth/signup', validator.userValidator, userController.addUser);
router.get('/api/v1/users/:user_id/parcels', Auth.verifyUser,userController.userParcel);
router.post('/api/v1/users/login',userController.loginUser);

export default router;
