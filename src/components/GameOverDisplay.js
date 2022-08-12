import React from 'react';
import styles from './GameOverDisplay.module.css';

const GameOverDisplay = (props) => {
    return (
        <div className={ styles['game-over-display'] }
        role="textbox"
        aria-label='game win summary'>
            <h1>You Win!</h1>
            <p>It took you
                <em> { props.totalGuesses } { props.totalGuesses <= 1 ? 'guess' : 'guesses' } </em>
                to break the code!
            </p>
            <button 
            className={styles['game-over-display__restart-button']}
            onClick={props.onRestartGame}>Play Again</button>
        </div>
    );
};

export default GameOverDisplay;