import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


//Get all the parcels
app.get('/api/v1/parcels', (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'user retrieved successfully',
        parcel: getParcel(db)
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
    const user = {
        id: db.length + 1,
        name: req.body.name,
        parcel: [{
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
        }]
    }
    db.push(user);
    return res.status(201).send({
        success: true,
        message: 'user created successsfully', user
    });
});


app.get('/api/v1/parcels/:id', (req, res) => {

    const id = parseInt(req.params.id, 10);
    // const id = parseInt(req.params.name, 10);


    getParcel(db).map((parcel) =>{
        if(parcel.id == id){
            return res.status(200).send({
                success: true,
                message: 'user retrieved successfully',
                users: getParcel(db)
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