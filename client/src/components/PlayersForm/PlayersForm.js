import React from 'react';
import './PlayersForm.css';
import Button from '../Button/Button';

const PlayersForm = props => {
	return (
		<div className='players-form'>
			<h5>Enter player's Names</h5>
			<div>
				<span>Players 1</span>
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
				<span>Players 2</span>
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
			<Button start={props.start}>START</Button>
		</div>
	);
};

export default PlayersForm;
