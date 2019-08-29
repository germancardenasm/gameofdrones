import React from 'react';
import './Round.css';

const Round = props => {
	return (
		<div className='round'>
			<h3>Round {props.round}</h3>
		</div>
	);
};

export default Round;
