var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'Gcm10321#',
	database: 'gameOfDrones'
});

connection.connect();

module.exports = connection;
