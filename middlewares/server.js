import express from 'express';
import bodyParser from 'body-parser';
import router from './route';

const app = express();

app.use(bodyParser.urlencoded({
	extended: false,
}));

app.use(express.json());

router.get('/', (req, res) => res.status(200).json({
	success: true,
	message: 'Send It API',
}));

app.use(router);

const PORT = 3000;

app.listen(PORT, () => {
	console.log('Listening');
});

export default app;
