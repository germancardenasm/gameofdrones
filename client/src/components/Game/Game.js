import React, { Component } from 'react';
import './Game.css';
import PanelPlayer from '../PlayerPanel/PlayerPanel';
import Score from '../Score/Score';
import PlayersForm from '../PlayersForm/PlayersForm';
import { players } from '../../assets/config';

export default class Game extends Component {
	state = {
		start: true,
		player1: 'German',
		player2: 'Paola',
		player1Move: '',
		player2Move: '',
		player1Wins: 0,
		player2Wins: 0,
		playerTurn: 1,
		winner: '',
		endGame: false
	};

	onChangeInput = props => {
		this.setState({ [props.player]: props.value });
	};
	onStartGame = () => {
		this.setState({ start: false });
	};
	onClickObject = obj => {
		if (this.state.playerTurn === 1) {
			this.setState({ player1Move: obj, playerTurn: 2 });
		} else {
			let winner = this.selectWinner(this.state.player1Move, obj);
			if (winner === undefined) {
				this.setState((prevState, props) => ({
					winner: undefined,
					playerTurn: 1
				}));
				return null;
			}
			const winnerKey = winner === '1' ? 'player1Wins' : 'player2Wins';
			if (this.state[winnerKey] === 2) {
				this.setState((prevState, props) => ({
					winner: winner,
					playerTurn: 1,
					[winnerKey]: prevState[winnerKey] + 1,
					endGame: true
				}));
			} else {
				this.setState((prevState, props) => ({
					winner: winner,
					playerTurn: 1,
					[winnerKey]: prevState[winnerKey] + 1
				}));
			}
		}
	};

	selectWinner = (player1Move, player2Move) => {
		let winner;
		console.log('entro');
		if (player1Move === player2Move) return undefined;
		if (player1Move === 'rock' && player2Move === 'sissors') {
			return '1';
		} else if (player1Move === 'rock' && player2Move === 'paper') {
			return '2';
		} else if (player1Move === 'paper' && player2Move === 'rock') {
			return '1';
		} else if (player1Move === 'paper' && player2Move === 'sissors') {
			return '2';
		} else if (player1Move === 'sissors' && player2Move === 'paper') {
			return '1';
		} else if (player1Move === 'sissors' && player2Move === 'rock') {
			return '2';
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
				<Score
					player1={this.state.player1Wins}
					player2={this.state.player2Wins}
				/>
				<main>{mainContent}</main>
			</div>
		);
	}
}
