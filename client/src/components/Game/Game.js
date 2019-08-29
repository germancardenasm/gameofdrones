import React, { Component } from 'react';
import PanelPlayer from '../PlayerPanel/PlayerPanel';
import Score from '../Score/Score';
import PlayersForm from '../PlayersForm/PlayersForm';
import Results from '../Results/Results';
import { initialState } from '../../assets/config';
import './Game.css';
import Round from '../Round/Round';

export default class Game extends Component {
	state = initialState;

	onChangeInput = props => {
		this.setState({ [props.player]: props.value });
	};
	onStartGame = () => {
		this.setState({ start: false });
	};

	onRestartGame = () => {
		this.setState(initialState);
	};

	onClickObject = obj => {
		if (this.state.playerTurn === 1 && obj.panel === 'panel1')
			this.setState({ player1Move: obj.object });
		else if (this.state.playerTurn === 2 && obj.panel === 'panel2') {
			this.setState({ player2Move: obj.object });
		}
	};

	onSelectObject = obj => {
		if (this.state.playerTurn === 1 && this.state.player1Move) {
			this.setState({ playerTurn: 2 });
		} else {
			if (!this.state.player2Move) return;
			let winner = this.selectWinner(
				this.state.player1Move,
				this.state.player2Move
			);
			if (winner === undefined) {
				this.setState((prevState, props) => ({
					winner: undefined,
					player1Move: '',
					player2Move: '',
					playerTurn: 1
				}));
				return null;
			}
			const winnerKey = winner === '1' ? 'player1Wins' : 'player2Wins';
			//If one player won
			if (this.state[winnerKey] === 2) {
				this.setState((prevState, props) => ({
					winner: winner,
					[winnerKey]: prevState[winnerKey] + 1,
					endGame: true
				}));
			} else {
				this.setState((prevState, props) => ({
					winner: winner,
					player1Move: '',
					player2Move: '',
					playerTurn: 1,
					[winnerKey]: prevState[winnerKey] + 1,
					round: prevState.round + 1
				}));
			}
		}
	};

	selectWinner = (player1Move, player2Move) => {
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
		let mainContent = this.state.start ? (
			<PlayersForm
				{...this.state}
				onChange={this.onChangeInput}
				start={this.onStartGame}
			/>
		) : (
			<>
				<PanelPlayer
					id='panel1'
					pid='1'
					player={this.state.player1}
					objSelected={this.state.player1Move}
					click={this.onClickObject}
					clickSelectButton={this.onSelectObject}
					turn={this.state.playerTurn}
				/>
				<PanelPlayer
					id='panel2'
					pid='2'
					player={this.state.player2}
					objSelected={this.state.player2Move}
					click={this.onClickObject}
					clickSelectButton={this.onSelectObject}
					turn={this.state.playerTurn}
				/>
			</>
		);

		if (this.state.endGame) {
			const winner =
				this.state.winner === '1'
					? this.state.player1
					: this.state.player2;
			mainContent = (
				<Results winner={winner} click={this.onRestartGame}></Results>
			);
		}

		return (
			<div className='game-board'>
				<header className='game-header'>
					<h1>Game of Drones</h1>
				</header>
				<Round round={this.state.round} />
				<Score
					player1={this.state.player1Wins}
					player2={this.state.player2Wins}
				/>
				<main>{mainContent}</main>
			</div>
		);
	}
}
