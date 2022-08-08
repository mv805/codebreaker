import codeGenerator from './codeGenerator';
import './App.css';
import GuessSelectionPanel from './components/GuessSelectionPanel';
import { useState } from 'react';
import Guess from './components/Guess';
import GameOverModal from './components/GameOverModal';

function App() {

  const [secretCode, setSecretCode] = useState([1, 2, 3, 4]);
  const [playerGuess, setPlayerGuess] = useState([0, 0, 0, 0]);
  const [playerGuessList, setplayerGuessList] = useState([0, 0, 0]);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div className="App">
      { gameOver && <GameOverModal /> }
      <h1 className='game-title'>Code Breaker</h1>
      <GuessSelectionPanel />
      { playerGuessList.map(guess => {
        return <Guess />;
      }) }
    </div>
  );
}

export default App;
