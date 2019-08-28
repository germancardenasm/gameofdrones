import React from 'react';
import './Results.css';

const Results = () => {
	return (
		<div className='results'>
			<h3>Score</h3>
			<span id='player1Score'>0</span> : <span id='player2Score'>0</span>
		</div>
	);
};

export default Results;
