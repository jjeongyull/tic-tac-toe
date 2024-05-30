import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning_combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function deGameBoard(gameTurn){
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveActivePlayer(gameTurn){
  let currentPlayer = 'X';
  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function selectWinner(gameBoard, players){
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ){
      winner = players[firstSquare];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  const gameBoard = deGameBoard(gameTurn);

  const winner = selectWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  const selectsquare = (rowIndex, colIndex) => {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updateTurn = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...prevTurn
      ];

      return updateTurn;
    })
  }

  const gameReMatch = () => {
    setGameTurn([]);
    
  }

  const playerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player playerNameChange={playerNameChange} name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'}/>
        <Player playerNameChange={playerNameChange} name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'}/>
      </ol>
      {(winner || hasDraw) && <GameOver gameReMatch={ gameReMatch } winner={winner} />}
      <GameBoard
        onSelectSquare={selectsquare}
        board={gameBoard}
      />
    </div>
    <Log turns={ gameTurn } />
  </main>
}

export default App;
