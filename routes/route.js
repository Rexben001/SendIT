import express from 'express';
import parcelController from '../controllers/parcelControllers';
import userController from '../controllers/userControllers';
import validator from '../middlewares/validation';



const router = express.Router();

router.get('/api/v1/parcels', parcelController.getParcels);
router.get('/api/v1/parcels/:parcel_id', parcelController.getAParcel);
router.post('/api/v1/parcels', validator.parcelValidator, parcelController.addParcelss);
router.put('/api/v1/parcels/:parcel_id/cancel', parcelController.cancelParcel);
router.put('/api/v1/parcels/:parcel_id/edit', parcelController.editParcel);


router.get('/api/v1/users', userController.getUsers);
router.post('/api/v1/users/register', validator.userValidator, userController.addUser);
router.get('/api/v1/users/:id/parcels', userController.userParcel);

export default router;
