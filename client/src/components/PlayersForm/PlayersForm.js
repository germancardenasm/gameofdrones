import React from 'react';
import './PlayersForm.css';
import Button from '../Button/Button';

const PlayersForm = props => {
	return (
		<div className='players-form'>
			<h5>Enter player's Names</h5>
			<div>
				<span>Player 1</span>
				<input
					id='player1'
					type='text'
					value={props.player1}
					onChange={e =>
						props.onChange({
							value: e.target.value,
							player: e.target.id
						})
					}
				/>
			</div>
			<div>
				<span>Player 2</span>
				<input
					id='player2'
					type='text'
					value={props.player2}
					onChange={e =>
						props.onChange({
							value: e.target.value,
							player: e.target.id
						})
					}
				/>
			</div>
			<Button click={props.start}>START</Button>
		</div>
	);
};

export default PlayersForm;
