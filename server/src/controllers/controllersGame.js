var con = require('../connection/Connection');

let gameVar = {
	player1Wins: 0,
	player2Wins: 0,
	playerTurn: 1,
	round: 1,
	winner: '',
	endGame: false,
	battleId: ''
};

function saveBattle(req, res, fields) {
	console.log('SAVE BATTLE');
	if (req.body.player1 === '' || req.body.player2 === '') {
		res.status(400).send("Player's name requiered");
		return;
	}
	const users = [req.body.player1, req.body.player2];
	const sqlQuery = `INSERT INTO battle (player1, player2) VALUES (?, ?)`;
	con.query(sqlQuery, users, (err, result) => {
		console.log(err);
		if (err) return res.send(err);
		res.json({ id: result.insertId });
	});
}

async function selectWinner(req, res, fields) {
	if (req.body.player1Move === '' || req.body.player1Move === '') {
		res.status(400).send('Both players most select a object');
		return;
	}
	const winner = getWinner(req.body.player1Move, req.body.player2Move);
	console.log('[back] Winner: ', winner);

	let sqlData = [req.body.battleId, winner];
	let sqlQuery = `INSERT INTO rounds (battleId, winner) VALUES (?, ?)`;
	const dbResponse = await con.query(sqlQuery, sqlData, (err, result) => {
		console.log('[back] DB Error: ', err);
		console.log('[back] DB Result: ', result);
		if (err) return res.send(err);
		return { id: result.id };
	});

	sqlData = [req.body.battleId];
	sqlQuery = `SELECT winner as player, count(winner) as wins FROM rounds WHERE battleId = ? group by winner`;
	con.query(sqlQuery, sqlData, (err, result) => {
		console.log('---', result);
		const resultPerPlayer = result.reduce((accum, current) => {
			accum[current['player']] = current['wins'];
			return accum;
		}, {});
		const endGame = resultPerPlayer[1] === 3 || resultPerPlayer[2] === 3;
		const playerWinner = endGame && (resultPerPlayer[1] === 3 ? 1 : 2);
		res.json({ result: resultPerPlayer, winner, endGame, playerWinner });
	});
}

function getWinner(player1Move, player2Move) {
	if (player1Move === player2Move) return 0;
	if (player1Move === 'rock' && player2Move === 'sissors') {
		return 1;
	} else if (player1Move === 'rock' && player2Move === 'paper') {
		return 2;
	} else if (player1Move === 'paper' && player2Move === 'rock') {
		return 1;
	} else if (player1Move === 'paper' && player2Move === 'sissors') {
		return 2;
	} else if (player1Move === 'sissors' && player2Move === 'paper') {
		return 1;
	} else if (player1Move === 'sissors' && player2Move === 'rock') {
		return 2;
	}
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
