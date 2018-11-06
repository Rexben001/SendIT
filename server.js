import express from 'express';
import bodyParser from 'body-parser';
import parcels from './controllers/routes/app'


const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use(bodyParser.json());


app.route('/v1/users/:id/parcels')
	.get(parcels.getParcels);

app.post('/v1/parcels').get(parcels.postParcels);






app.use('/api', router);

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`)
});

module.exports = app;