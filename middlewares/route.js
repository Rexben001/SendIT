import express from 'express';
import parcelController from '../controllers/parcelController';
import userController from '../controllers/userControllers';

const router = express.Router();

router.get('/api/v1/parcels', parcelController.getParcels);
router.get('/api/v1/parcels/:id', parcelController.getAParcel);
router.post('/api/v1/parcels', parcelController.createParcels);
router.put('/api/v1/parcels/:id/cancel', parcelController.cancelParcel);
router.put('/api/v1/parcels/:id/edit', parcelController.editParcel);

router.get('/api/v1/users', userController.getUsers);
router.post('/api/v1/users/register', userController.addUser);
router.get('/api/v1/users/:userId/parcels', userController.userParcel);
export default router;
