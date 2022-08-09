import codeGenerator from './codeGenerator';
import uniqid from 'uniqid';
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

  function updateGuess(direction, index) {

    if (direction === 'up') {
      if (playerGuess[index] >= 9) {
        playerGuess[index] = 0;
      } else {
        playerGuess[index] += 1;
      }
    } else if (direction === 'down') {
      if (playerGuess[index] <= 0) {
        playerGuess[index] = 9;
      } else {
        playerGuess[index] -= 1;
      }
    } else {
      throw new Error();
    }
    setPlayerGuess([...playerGuess]);
  }

  function guessSubmitHandler() {
    setplayerGuessList(prevState => [...prevState, playerGuess]);
  }

  return (
    <div className="App">
      { gameOver && <GameOverModal /> }
      <h1 className='game-title'>Code Breaker</h1>
      <GuessSelectionPanel
        currentGuess={ playerGuess }
        onDigitChange={ (e) => updateGuess(e.direction, e.index) }
        onSubmitGuess={ guessSubmitHandler }
      />
      { playerGuessList.map(guess => {
        return <Guess key={ uniqid() } />;
      }) }
    </div>
  );
}

export default App;
