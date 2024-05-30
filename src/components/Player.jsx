import { useState } from "react";

export default function Player({ name, symbol, isActive, playerNameChange }) {

  const [isEditing, setIsEditing] = useState(false);
  const [playerValue, setPlayerValue] = useState(name);
  
  let playerName = <span className="player-name">{playerValue}</span>;
  if (isEditing) {
    playerName = <input type="text" onChange={(e) => setPlayerValue(e.target.value)} required value={playerValue}/>
  }

  const btnSetEditMode = () => {
    setIsEditing(!isEditing);
    playerNameChange(symbol, playerValue);
  }



  return (
    <li className={isActive ? 'active' : ''}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{ symbol }</span>
      </span>
      <button onClick={btnSetEditMode}>{ isEditing? "Save": "Edit" }</button>
    </li>
  )
}