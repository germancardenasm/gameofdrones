import React from 'react';
import './Results.css';
import Button from '../Button/Button';
import throne from '../../assets/images/throne _sm.png';

const Results = props => {
	return (
		<div className='results'>
			<h3>We have a WINNER!!</h3>
			<img src={throne} alt={'throne'} />
			<p> {props.winner} is the new EMPEROR!</p>
			<Button click={props.click}>Play Again</Button>
		</div>
	);
};

export default Results;
