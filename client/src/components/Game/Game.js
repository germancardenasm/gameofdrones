import React, { Component } from 'react';
import PanelPlayer from '../PlayerPanel/PlayerPanel';
import Score from '../Score/Score';
import PlayersForm from '../PlayersForm/PlayersForm';
import Results from '../Results/Results';
import { initialState } from '../../assets/config';
import { DELAY } from '../../assets/config';
import './Game.css';
import Round from '../Round/Round';
import Records from '../Records/Records';

export default class Game extends Component {
	state = { ...initialState };

	onChangeInput = props => {
		this.setState({ [props.player]: props.value });
	};
	onStartGame = () => {
		this.setState({ start: false });
	};

	onRestartGame = () => {
		this.setState({ ...initialState });
	};

	onClickObject = obj => {
		if (this.state.playerTurn === 1 && obj.panel === 'panel1')
			this.setState({ player1Move: obj.object });
		else if (this.state.playerTurn === 2 && obj.panel === 'panel2') {
			this.setState({ player2Move: obj.object });
		}
	};

	onSelectObject = obj => {
		//Pass turn to player 2
		if (this.state.playerTurn === 1 && this.state.player1Move) {
			this.setState({ playerTurn: 2 });
		} else {
			//Validate player 2 select an option before pressing OK
			if (!this.state.player2Move) return;
			//Select Winner
			let winner = this.selectWinner(
				this.state.player1Move,
				this.state.player2Move
			);
			//If both selected same object , there is no winner
			if (winner === undefined) {
				this.setState(
					(prevState, props) => ({
						playerTurn: 0
					}),
					() => {
						setTimeout(() => {
							this.setState({
								winner: undefined,
								player1Move: '',
								player2Move: '',
								playerTurn: 1
							});
						}, DELAY);
					}
				);
				return null;
			} else {
				//If a player won the match, show objects selected and show the winner
				const winnerKey =
					winner === '1' ? 'player1Wins' : 'player2Wins';
				if (this.state[winnerKey] === 2) {
					this.setState(
						(prevState, props) => {
							return {
								winner: winner,
								[winnerKey]: prevState[winnerKey] + 1,
								record: prevState.record.concat(winner),
								playerTurn: 0
							};
						},
						() => {
							setTimeout(() => {
								this.setState({
									endGame: true
								});
							}, DELAY);
						}
					);
				} else {
					/* If a player won Round,show the selected objects, then next round*/
					this.setState(
						(prevState, props) => {
							return {
								playerTurn: 0,
								[winnerKey]: prevState[winnerKey] + 1,
								record: prevState.record.concat(winner)
							};
						},
						() => {
							setTimeout(() => {
								this.setState((prevState, props) => {
									return {
										winner: winner,
										player1Move: '',
										player2Move: '',
										playerTurn: 1,
										round: prevState.round + 1
									};
								});
							}, DELAY);
						}
					);
				}
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
					turn={this.state.playerTurn}
					click={this.onClickObject}
					clickSelectButton={this.onSelectObject}
				/>
				<PanelPlayer
					id='panel2'
					pid='2'
					player={this.state.player2}
					objSelected={this.state.player2Move}
					turn={this.state.playerTurn}
					click={this.onClickObject}
					clickSelectButton={this.onSelectObject}
				/>
				<Records
					record={this.state.record}
					player1={this.state.player1}
					player2={this.state.player2}
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
