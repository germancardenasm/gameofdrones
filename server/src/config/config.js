import * as sharedConfig from './defaults.js';

import paper from '../assets/images/paper.png';
import rock from '../assets/images/rock.png';
import sissors from '../assets/images/sissors.png';

export const PLAYER_1_IDENTIFIER = sharedConfig.PLAYER_1_IDENTIFIER;
export const PLAYER_2_IDENTIFIER = sharedConfig.PLAYER_2_IDENTIFIER;
export const NO_WINNER_IDENTIFIER = sharedConfig.NO_WINNER_IDENTIFIER;
export const MOVE_IDENTIFIER_PAPER = sharedConfig.MOVE_IDENTIFIER_PAPER;
export const MOVE_IDENTIFIER_ROCK = sharedConfig.MOVE_IDENTIFIER_ROCK;
export const MOVE_IDENTIFIER_SISSORS = sharedConfig.MOVE_IDENTIFIER_SISSORS;

// export const objects = [[MOVE_IDENTIFIER_ROCK, rock], [MOVE_IDENTIFIER_PAPER, paper], [MOVE_IDENTIFIER_SISSORS, sissors]];
export const objects = [
	{
		move: MOVE_IDENTIFIER_ROCK,
		image: rock
	},
	{
		move: MOVE_IDENTIFIER_PAPER,
		image: paper
	},
	{
		move: MOVE_IDENTIFIER_SISSORS,
		image: sissors
	}
];

export const initialState = {
	start: true,
	player1: 'German',
	player2: 'Paola',
	player1Move: '',
	player2Move: '',
	playerWins: { [PLAYER_1_IDENTIFIER]: 0, [PLAYER_2_IDENTIFIER]: 0 },
	playerTurn: PLAYER_1_IDENTIFIER,
	round: 1,
	winner: '',
	endGame: false,
	record: [],
	battleId: ''
};

export const PLAYERS = 2;

export const DELAY = 1200;

export const BATTLE_STATE = {
	WINNER: 1,
	NO_WINNER: 2,
	GAME_END: 3,
	STATE_4: 4
};
