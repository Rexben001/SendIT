import Parcels from '../models/parcels';

class ParcelController{
    static getParcels(req, res){
        return res.json({
            message: 'List of all parcels',
            parcels: Parcels,
          });
    }
    static createParcels(req, res){
        const parcel = {
        id: req.body.id,
		weight: req.body.weight,
		username: req.body.username,
		emailAddress: req.body.emailAddress,
		pickup: req.body.pickup,
		phone: req.body.phone,
		picker: req.body.picker,
		emailOfPicker: req.body.emailOfPicker,
		phoneOfPicker: req.body.phoneOfPicker,
		destination: req.body.destination,
        status: req.body.status,
        }
        if(!req.body){
            res.status(400).json({
                message: 'invalid data',
              });
        }else{
            Parcels.push(parcel);
            res.status(200).json({
                message: 'created a new parcel',
                data: parcel,
              });
            }
        }
        
        static getAParcel(req, res){
            const id = req.body.id;
            Parcels.map((parcel) => {
                    if (parcel.id === id) {
                        return res.status(200).json({
                            message: "Parcel retrieved successfully",
                            parcels: parcel,
                        });
                    }
                    return res.status(400).json({
                        message: 'parcel not found',
                    });
            });
    }
    static cancelParcel(req, res){

    }
}

