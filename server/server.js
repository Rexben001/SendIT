import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';
import parcel from './models/parcelsdb';
import users from './models/userdb';

parcel.createTables();
users.createTables();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


router.get('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Send It API',
}));


app.use('/api/v1', router);



app.listen(3000 || process.env.PORT);

export default app;
