import React from 'react';
import './Results.css';

const Results = props => {
	return (
		<div className='results'>
			<h3>Score</h3>
			<span id='player1Score'>{props.player1}</span> :{' '}
			<span id='player2Score'>{props.player2}</span>
		</div>
	);
};

export default Results;
