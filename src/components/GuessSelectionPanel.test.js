//clicking the arrows and cyling through all nubmers and back to 0 or 9
//displaying the current guess correctly

import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { codeGenerator } from '../codeGenerator';

import GuessSelectionPanel from './GuessSelectionPanel';

const CODES_GENERATED = 1000;
let generatedTestCodes = [];
for (let index = 0; index < CODES_GENERATED; index++) {
    generatedTestCodes.push(codeGenerator());
}

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe('GuessSelectionPanel component', () => {

    describe('digital display', () => {

        generatedTestCodes.forEach(testCase => {
            it("displays the correct guess in the display", () => {
                render(<GuessSelectionPanel
                    currentGuess={ testCase }
                />, container);

                let codeOnScreen = screen.getAllByRole('textbox').map(digit => { return digit.textContent; }).join('');
                expect(codeOnScreen).toBe(`${ testCase.join('') }`);
            });
        });

    });

    describe('arrow buttons', () => {

        it('should fire the click events with correct event object when clicking the arrow buttons', () => {

            let onDigitChangeTest = jest.fn();

            render(<GuessSelectionPanel
                currentGuess={ [0, 0, 0, 0] }
                onDigitChange={ onDigitChangeTest }
            />, container);

            const arrowUpButtons = screen.getAllByRole('button', { name: /arrow up/i });

            arrowUpButtons.forEach((button, digitIndex) => {
                userEvent.click(button);
                expect(onDigitChangeTest).toHaveBeenLastCalledWith({
                    direction: 'up',
                    index: digitIndex
                });
            });

            const arrowDownButtons = screen.getAllByRole('button', { name: /arrow down/i });

            arrowDownButtons.forEach((button, digitIndex) => {
                userEvent.click(button);
                expect(onDigitChangeTest).toHaveBeenLastCalledWith({
                    direction: 'down',
                    index: digitIndex
                });
            });
        });

    });

    describe('submit button', () => {

        it('should pass the guess submit event when clicked', () => {
            const onSubmitGuessTest = jest.fn();

            render(<GuessSelectionPanel
                currentGuess={ [0, 0, 0, 0] }
                onSubmitGuess={onSubmitGuessTest}
            />, container);

            const submitButton = screen.getByRole('button', {name: /submit/i});
            userEvent.click(submitButton);
            expect(onSubmitGuessTest).toHaveBeenCalledTimes(1);
            expect(onSubmitGuessTest).not.toHaveBeenCalledTimes(0);

        });
    });


});
