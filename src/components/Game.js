import React,{useState} from "react";
import Board from "./Board";

function Game (){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentBoard = currentHistory[currentHistory.length - 1];
    const squares = [...currentBoard];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setXIsNext(!xIsNext);
    setHistory([...history, squares])
    setStepNumber(history.length);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function jumpTo(step) {
    setStepNumber (step);
    setXIsNext((step % 2) === 0);
  }
    const currentHistory = history;
    const current = currentHistory[stepNumber];
    const winner = calculateWinner(current);

    const moves = currentHistory.map((step, move) => {
      const desc = move ?
        'go to move #' + move:
        'go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }


  
export default Game;