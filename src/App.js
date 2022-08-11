import codeGenerator from './codeGenerator';
import uniqid from 'uniqid';
import './App.css';
import GuessSelectionPanel from './components/GuessSelectionPanel';
import { useState } from 'react';
import Guess from './components/Guess';
import GameOverDisplay from './components/GameOverDisplay';

function App() {

  const [secretCode, setSecretCode] = useState([1, 1, 3, 8]);
  const [playerGuess, setPlayerGuess] = useState([0, 0, 0, 0]);
  const [playerGuessList, setplayerGuessList] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const updateGuess = (direction, index) => {

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
  };

  const guessSubmitHandler = () => {

    setplayerGuessList(prevState => [[...playerGuess], ...prevState]);

    if (playerGuess.every((number, index) => number === secretCode[index])) {
      setGameOver(true);
    }

  };

  const getPegColors = (playerGuess, secretCode) => {

    const emptyPegs = [];
    const redPegs = [];
    const whitePegs = [];

    playerGuess.forEach((number, index) => {

      if (secretCode[index] === number) {
        redPegs.push('red');
      } else if (secretCode.includes(number)) {
        whitePegs.push('white');
      } else {
        emptyPegs.push('empty');
      }

    });

    return [...redPegs, ...whitePegs, ...emptyPegs];

  };

  return (
    <div className="App">
      <h1 className='game-title'>Code Breaker</h1>
      { gameOver && <GameOverDisplay totalGuesses={ playerGuessList.length } /> }
      { !gameOver && <GuessSelectionPanel
        currentGuess={ playerGuess }
        onDigitChange={ (e) => updateGuess(e.direction, e.index) }
        onSubmitGuess={ guessSubmitHandler }
      /> }
      { playerGuessList.map((guess, index) => {
        return <Guess
          playerGuess={ guess }
          key={ uniqid() }
          guessKeys={ getPegColors(guess, secretCode) }
          lastGuess={ index === 0 ? true : false } />;
      }) }
    </div>
  );
}

export default App;
