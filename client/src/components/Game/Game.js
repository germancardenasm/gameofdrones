import React, { Component } from 'react';
import './Game.css';
import PanelPlayer from '../PlayerPanel/PlayerPanel';
import Results from '../Results/Results';
import PlayersForm from '../PlayersForm/PlayersForm';
import { players } from '../../assets/config';

export default class Game extends Component {
	state = {
		start: true,
		player1: '',
		player2: '',
		player1Move: '',
		player2Move: '',
		playerTurn: 1,
		endGame: 0
	};

	onChangeInput = props => {
		this.setState({ [props.player]: props.value });
	};
	onStartGame = () => {
		this.setState({ start: false });
	};
	onClickObject = obj => {
		debugger;
		if (this.state.playerTurn === 1) {
			this.setState({ player1Move: obj, playerTurn: 2 });
		} else {
			this.setState({ player2Move: obj });
			debugger;
		}
	};

	render() {
		const mainContent = this.state.start ? (
			<PlayersForm
				{...this.state}
				onChange={this.onChangeInput}
				start={this.onStartGame}
			/>
		) : (
			<>
				<PanelPlayer
					id='panel1'
					player={this.state.player1}
					click={this.onClickObject}
				/>
				<PanelPlayer
					id='panel2'
					player={this.state.player2}
					click={this.onClickObject}
				/>
			</>
		);
		return (
			<div className='game-board'>
				<header className='game-header'>
					<h1>Game of Drones</h1>
				</header>
				<Results />
				<main>{mainContent}</main>
			</div>
		);
	}
}
