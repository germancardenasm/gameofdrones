import React from 'react';
import './Records.css';

const Records = props => {
	const records = props.record.map((rec, index) => {
		let player = props.player1;
		if (rec === '2') player = props.player2;
		return (
			<tr key={index}>
				<td>{index + 1}</td>
				<td>{player}</td>
			</tr>
		);
	});
	return (
		<div className='records'>
			<table>
				<tbody>
					<tr>
						<th>Round</th>
						<th>Winner</th>
					</tr>
					{records}
				</tbody>
			</table>
		</div>
	);
};

export default Records;
