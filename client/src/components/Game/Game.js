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
		const data = {
			player1: this.state.player1,
			player2: this.state.player2
		};

		fetch('http://localhost:4000/battle', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				player1: this.state.player1,
				player2: this.state.player2
			})
		})
			.then(response => response.json())
			.then(response => {
				console.log('[front] REPONSE START GAME', response);
				this.setState({ start: false, battleId: response.id });
			});
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

	onSelectObject = async obj => {
		//Pass turn to player 2
		if (this.state.playerTurn === 1 && this.state.player1Move) {
			this.setState({ playerTurn: 2 });
		} else {
			//Validate player 2 select an option before pressing OK
			if (!this.state.player2Move) return;
			//Select Winner
			const response = await fetch('http://localhost:4000/selectwinner', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					battleId: this.state.battleId,
					player1Move: this.state.player1Move,
					player2Move: this.state.player2Move
				})
			});
			let data = await response.json();
			const { playerWinner, winner } = data;
			let score = data.result;
			//If both selected same object , there is no winner
			if (winner == 0) {
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
				const winnerKey = `player${winner}Wins`;
				if (data.endGame) {
					this.setState(
						(prevState, props) => {
							return {
								winner: playerWinner,
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
								record: prevState.record.concat(winnerKey)
							};
						},
						() => {
							setTimeout(() => {
								this.setState((prevState, props) => {
									return {
										winner: playerWinner,
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

	render() {
		let mainContent = this.state.start ? (
			<PlayersForm
				{...this.state}
				onChange={this.onChangeInput}
				start={this.onStartGame}
			/>
		) : (
			<>
				<Round round={this.state.round} />
				<Score
					player1={this.state.player1Wins}
					player2={this.state.player2Wins}
				/>
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
				this.state.winner === '1' || this.state.winner === 1
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

				<main>{mainContent}</main>
			</div>
		);
	}
}
