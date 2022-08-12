import React from 'react';
import styles from './Guess.module.css';
import uniqid from 'uniqid';
import KeyPegDisplay from './KeyPegDisplay';

const Guess = (props) => {
    return (
        <div className={
            `${ styles.panel } ${ props.lastGuess ? styles['last-guess'] : '' }` }
            role="textbox"
            aria-label={ `guess ${ props.guessNumber }` }>
            <div className={ styles.digits }>
                { props.playerGuess.map((_digit, index) => {
                    return <div
                        className={ styles['digits__cell'] }
                        key={ uniqid() }
                        role="textbox"
                        aria-label={ `guess digit ${ index + 1 }` }>
                        { props.playerGuess[index] }
                    </div>;
                }) }
            </div>
            <KeyPegDisplay
                guessKeys={ props.guessKeys }
            />
        </div>
    );
};

export default Guess;