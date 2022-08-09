import React from 'react';
import uniqid from 'uniqid';
import DigitSelector from './DigitSelector';
import styles from './GuessSelectionPanel.module.css';

const GuessSelectionPanel = (props) => {
    return (
        <div className={ styles.panel }>
            <div className={ styles[`panel__digit-selector`] }>
                { props.currentGuess.map((digit, index) => {
                    return <DigitSelector
                        key={ uniqid() }
                        digitIndex={ index }
                        digitValue={ digit }
                        onDigitChange={ (e) => props.onDigitChange(e) }
                    />;
                }) }
            </div>
            <button
                className={ styles['panel__submit-button'] }
                onClick={ props.onSubmitGuess }>Submit</button>
        </div>
    );
};

export default GuessSelectionPanel;