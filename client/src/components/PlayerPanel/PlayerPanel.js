import React from 'react';
import './PlayerPanel.css';
import Button from '../Button/Button';
import ObjectIcon from '../ObjectIcon/ObjectIcon';
import { objects } from '../../assets/config';

export default function PlayerPanel(props) {
	const OBJ = 0;
	const Image = 1;
	return (
		<div className='player-panel' id={props.id}>
			<h4>{props.player}</h4>
			{objects.map(img => (
				<ObjectIcon
					key={img[OBJ]}
					id={props.id + img[OBJ]}
					image={img[Image]}
					click={() => props.click(img[OBJ])}
				/>
			))}
			<Button>OK</Button>
		</div>
	);
}
