import React from 'react';
import './Score.css';

const Score = props => {
	return (
		<div className='score'>
			<h3>Score</h3>
			<span id='player1Score'>{props.player1}</span> :{' '}
			<span id='player2Score'>{props.player2}</span>
		</div>
	);
};

export default Score;
