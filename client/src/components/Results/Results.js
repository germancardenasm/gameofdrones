import React from 'react';
import './Results.css';
import Button from '../Button/Button';

const Results = props => {
	return (
		<div className='results'>
			<h3>We have a WINNER!!</h3>
			<p> {props.winner} is the new EMPEROR!</p>
			<Button click={props.click}>Play Again</Button>
		</div>
	);
};

export default Results;
