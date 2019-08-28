const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
var cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.get('/', controllerGame);
app.listen(PORT, () => {
	debug('Listening at port ', chalk.green(PORT));
});
