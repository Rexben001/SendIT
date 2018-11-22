import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/route';

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

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Listening...');
});

export default app;
