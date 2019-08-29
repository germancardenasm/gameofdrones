var con = require('../connection/Connection');
const debug = require('debug')('app : controllerGame');

function saveBattle(req, res, fields) {
	const msg = 'SAVE BATTLE';
	debug(msg);
	res.send(JSON.stringify(msg));
}

function selectWinner(req, res, fields) {
	const msg = 'SELECT WINNER LOGIC';
	debug(msg);
	res.send(JSON.stringify(msg));
}

function saveRecords(req, res, fields) {
	const msg = 'SAVE WINNRES RECORDS';
	console.log(msg);
	res.send(JSON.stringify(msg));
}

function getRecords(req, res, fields) {
	const msg = 'GET RECORDS';
	console.log(msg);
	res.send(JSON.stringify(msg));
}

module.exports = {
	saveBattle: saveBattle,
	selectWinner: selectWinner,
	saveRecords: saveRecords,
	getRecords: getRecords
};
