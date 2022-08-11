import React from 'react';
import styles from './KeyPegDisplay.module.css';
import uniqid from 'uniqid';

const KeyPegDisplay = (props) => {
    return (
        <div className={ styles.display }>
            { props.guessKeys.map((pegColor, index) => {
                return <div
                    className={ styles['display__cell'] }
                    key={ uniqid() }
                    role="textbox"
                    aria-label={ `guess peg box ${ index + 1 }` }>
                    <div
                        className={ styles[`display__cell__${ pegColor }-peg`] }
                        key={ uniqid() }
                        role="textbox"
                        aria-label={ `${ pegColor } key peg` } />
                </div>;
            }) }
        </div>
    );
};

export default KeyPegDisplay;