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
app.use(express.static(path.join(__dirname, '/public/')));
app.get('/', (req, res) => {
	res.send('Hello World');
});
app.get('/battle', controllerGame.saveBattle);
app.get('/selectWinner', controllerGame.selectWinner);
app.get('/saveRecords', controllerGame.saveRecords);
app.get('/getRecords', controllerGame.getRecords);
app.listen(PORT, () => {
	debug('Listening at port ', chalk.green(PORT));
});
