import React from 'react';
import styles from './DigitSelector.module.css';
import arrowUp from '../assets/TriangleArrow-Up.svg';
import arrowDown from '../assets/TriangleArrow-Down.svg';

const DigitSelector = (props) => {
    return (
        <div className={ styles.selector }>
            <button
                className={ styles['selector__button'] }
                onClick={ () => {
                    props.onDigitChange({
                        direction: 'up',
                        index: props.digitIndex
                    });
                } }>
                <img src={ arrowUp } alt={`arrow up ${props.digitIndex + 1}`}/>
            </button>
            <div role="textbox" aria-label={`digit ${props.digitIndex + 1}`}>{ props.digitValue }</div>
            <button
                className={ styles['selector__button'] }
                onClick={ () => {
                    props.onDigitChange({
                        direction: 'down',
                        index: props.digitIndex
                    });
                } }>
                <img src={ arrowDown } alt={`arrow down index ${props.digitIndex}`} />
            </button>
        </div>
    );
};

export default DigitSelector;