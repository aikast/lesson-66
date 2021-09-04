import { useState } from "react"

import styles from "./Game.module.scss";
import Board from "../Board";
import determineWinner from "../../utils/determineWinner";

const Game = () => {

	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [stepNumber, setStepNumber] = useState(0);
	const [xIsNext, setXisNext] = useState(true);
	const winner = determineWinner(history[stepNumber]);

	const xO = xIsNext ? "X": "O";

	const handleClick =(i) => {
		
		// вся история
		const historyPoint = history.slice(0, stepNumber + 1);
		console.log("ВСЯ ИСТОРИЯ", historyPoint)
		// текущий шаг
		const currentStep = historyPoint[stepNumber];
		// копия текущего состояния
		const currentSquares = [...currentStep];

		// определение победителя
		if(winner || currentSquares[i]) return;



		currentSquares[i] = xO;
		console.log("ТЕКУЩИЙ ШАГ",currentSquares);

		setHistory([...historyPoint, currentSquares]);
		setStepNumber(historyPoint.length);
		setXisNext(!xIsNext);
	}

	const renderMoves = () => 
		history.map((step, move)=> {
			const destination = move ? `Перейти к шагу № ${move}` : `Перейти в начало`;
			console.log(move);
			return(
				<li key={move}>
					<button 
						className={styles["move-button"]}
						onClick={()=> {goToStep(move)}}
					>
						{destination}
					</button>
				</li>
			)
		})

		const goToStep = (move) => {
			setStepNumber(move)
			setXisNext(move % 2 === 0)
		}

	const resetGame = () => {
		setHistory([Array(9).fill(null)]);
		setXisNext(true);
		setStepNumber(0);
	}

	return(
		<>
			<h1 className={styles["game-title"]}>Крестики-нолики</h1>
			<button onClick={resetGame}>Сбросить игру</button>
			<Board
				squares={history[stepNumber]}
				onClick={handleClick}
			/>
			<div>
					<h3>
						{winner ? `Победитель ${winner}` : `Следующий шаг сделает: ${xO}`}
					</h3>
			</div>
			<div className={styles.history}>
				<div>
					<h3>История действий</h3>
					{renderMoves()}
				</div>
			</div>
			
		</>
	)
}

export default Game;

// стилизовать кнопки переходов по шагам и кнопку сброса
// переместить историю направо от доски
// сделать модалку когда появляется победитель


// усложнение
// в модалке две кнопки
// продолжить игру 
// сбросить