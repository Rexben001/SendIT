import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(bodyParser.json());

router.get('/', (req, res) => res.status(200).json({
    success: true,
    message: 'Send It API',
  }));
  
app.use('/api', router);

const PORT = 3000;

app.listen(PORT);