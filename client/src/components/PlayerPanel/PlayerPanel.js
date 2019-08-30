import React from 'react';
import './PlayerPanel.css';
import Button from '../Button/Button';
import ObjectIcon from '../ObjectIcon/ObjectIcon';
import { objects } from '../../assets/config';

export default function PlayerPanel(props) {
	const OBJ = 0;
	const Image = 1;
	const visibleClass = !(props.turn == props.pid || props.turn == 0)
		? 'overlay visible'
		: 'overlay';
	return (
		<div className='player-panel'>
			<div className={visibleClass}></div>
			<div id={props.id}>
				<h4>{props.player}</h4>
				{objects.map(img => (
					<ObjectIcon
						key={img[OBJ]}
						id={props.id + img[OBJ]}
						obj={img[OBJ]}
						image={img[Image]}
						objSelected={props.objSelected}
						click={() =>
							props.click({ panel: props.id, object: img[OBJ] })
						}
					/>
				))}
				<Button
					disabled={!(props.pid == props.turn)}
					click={props.clickSelectButton}
				>
					OK
				</Button>
			</div>
		</div>
	);
}
