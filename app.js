import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const parcel = db.parcel;
const users  = db.users;

//Get all the parcels
app.get('/api/v1/parcels', (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'user retrieved successfully',
        parcel: parcel
    });
});

//Create a user
app.post('/api/v1/parcels', (req, res) => {
    if(!req.body){
        return res.status(400).send({
            success: false,
            message: 'Enter the fields correctly'
        });
    }
    const parcel = {
                id: db.length+11,
                weight: req.body.weight,
                username: req.body.username,
                emailAddress: req.body.emailAddress,
                pickup: req.body.pickup,
                phone: req.body.phone,
                picker: req.body.picker,
                emailOfPicker: req.body.emailOfPicker,
                phoneOfPicker: req.body.phoneOfPicker,
                destination: req.body.destination,
                status: req.body.status
    }
    parcel.push(parcel);
    return res.status(201).send({
        success: true,
        message: 'user created successsfully', user
    });
});


app.get('/api/v1/parcels/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);


    parcel.map((parcel) =>{
        if(parcel.id == id){
            return res.status(200).send({
                success: true,
                message: 'user retrieved successfully',
                parcel: parcel
            });
        }
    });
    return res.status(404).send({
        success: false,
        message: 'user does not exist',
    });
});

function getParcel(db){
    let returnValue = [];
    for(let i = 0; i < db.length; i++){
        returnValue.push(db[i].parcel);   
    }
    return returnValue;
}



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});