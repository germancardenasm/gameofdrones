const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const controllerGame = require('./src/controllers/controllersGame.js');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send('Hello World');
});
app.post('/battle', controllerGame.saveBattle);
app.post('/selectwinner', controllerGame.selectWinner);
app.post('/saverecords', controllerGame.saveRecords);
app.get('/getrecords', controllerGame.getRecords);
app.listen(PORT, () => {
	debug('Listening at port ', chalk.green(PORT));
});
