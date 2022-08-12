import React from 'react';
import styles from './SecretCode.module.css';

const SecretCodeDisplay = (props) => {

    const hiddenDigits = <div
        className={ `${ styles.cell } ${ styles['display__digits__hidden'] }` }
        role='textbox'
        aria-label='secret code display'>
        <div>?</div>
        <div>?</div>
        <div>?</div>
        <div>?</div>
    </div>;

    const notHiddenDigits = <div
        className={ `${ styles.cell } ${ styles['display__digits__revealed'] }` }
        role='textbox'
        aria-label='secret code display'>
        <div>{ props.secretCode[0] }</div>
        <div>{ props.secretCode[1] }</div>
        <div>{ props.secretCode[2] }</div>
        <div>{ props.secretCode[3] }</div>
    </div>;

    return (
        <div className={ styles.display }>
            <h1>Secret Code:</h1>
            { props.hidden && hiddenDigits }
            { !props.hidden && notHiddenDigits }
        </div>
    );
};

export default SecretCodeDisplay;