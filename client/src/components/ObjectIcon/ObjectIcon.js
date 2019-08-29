import React from 'react';
import './ObjectIcon.css';

const ObjectIcon = props => {
	const objClassName =
		props.obj === props.objSelected
			? 'object-icon selected'
			: 'object-icon';

	return (
		<div id={props.id} className={objClassName} onClick={props.click}>
			<img src={props.image} alt={props.obj} />
		</div>
	);
};

export default ObjectIcon;
