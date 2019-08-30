import { NO_WINNER_IDENTIFIER, BATTLE_STATE } from '../config/config';

export function nextBattleState({ winner, endGame }) {
	//If both selected same object , there is no winner
	if (winner === NO_WINNER_IDENTIFIER) {
		return BATTLE_STATE.NO_WINNER;
	} else if (endGame) {
		return BATTLE_STATE.GAME_END;
	} else {
		return BATTLE_STATE.WINNER;
	}
}
