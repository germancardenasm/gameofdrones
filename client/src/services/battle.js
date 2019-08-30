const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
console.log(process.env);
export async function getSelectWinner({ battleId, player1Move, player2Move }) {
	const response = await fetch(`${API_URL}/selectwinner`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			battleId,
			player1Move,
			player2Move
		})
	});

	return response;
}

export async function createBattle({ player1, player2 }) {
	const response = await fetch(`${API_URL}/battle`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			player1,
			player2
		})
	});
	const responseJson = await response.json();
	return responseJson;
}
