export default function GameOver({ winner, gameReMatch }) {
  
  return <div id="game-over">
    <h2>Game Over!</h2>
    { winner && <p>{winner} won!</p> }
    { !winner &&  <p>It's a draw!</p> }
    <p><button onClick={gameReMatch}>Rematch!</button></p>
  </div>
}