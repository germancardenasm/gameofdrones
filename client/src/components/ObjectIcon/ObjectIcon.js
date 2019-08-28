import React from 'react';
import paper from '../../assets/images/paper.png';

import './ObjectIcon.css';

const ObjectIcon = props => {
	return (
		<div id={props.id} className='object-icon' onClick={props.click}>
			<img src={props.image} />
		</div>
	);
};

export default ObjectIcon;
