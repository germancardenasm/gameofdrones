import paper from './images/paper.png';
import rock from './images/rock.png';
import sissors from './images/sissors.png';

export const objects = [['rock', rock], ['paper', paper], ['sissors', sissors]];

export const players = 2;

export const initialState = {
	start: true,
	player1: 'German',
	player2: 'Paola',
	player1Move: '',
	player2Move: '',
	player1Wins: 0,
	player2Wins: 0,
	playerTurn: 1,
	round: 1,
	winner: '',
	endGame: false,
	record: []
};
