import paper from './images/paper.png';
import rock from './images/rock.png';
import sissors from './images/sissors.png';

export const objects = [['rock', rock], ['paper', paper], ['sissors', sissors]];

export const initialState = {
	start: true,
	player1: '',
	player2: '',
	player1Move: '',
	player2Move: '',
	player1Wins: 0,
	player2Wins: 0,
	playerTurn: 1,
	round: 1,
	winner: '',
	endGame: false,
	record: [],
	battleId: ''
};

export const PLAYERS = 2;

export const DELAY = 1500;
