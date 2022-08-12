/* eslint-disable testing-library/no-unnecessary-act */
import { render } from '@testing-library/react';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import renderer, { act } from "react-test-renderer";
import App from './App';
import { codeGenerator } from './codeGenerator';

jest.mock('./codeGenerator', () => {
    return {
        codeGenerator() {
            return [1, 2, 3, 4];
        }
    };
});

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

it('should produce correct mocked value from the code generator', () => {
    expect(codeGenerator()).toEqual([1, 2, 3, 4]);
});

describe('Correct initial rendering of the App', () => {

    it('renders correctly', () => {
        const app = renderer.create(<App />).toJSON();
        expect(app).toMatchSnapshot();
    });

});

describe('integration test', () => {

    it('should complete a full game correctly', () => {
        render(<App />, container);
        //guess selector is present
        const guessSelector = screen.queryByRole('menu', { name: /guess selector/i });
        expect(guessSelector).toBeInTheDocument();

        const submitButton = screen.queryByRole('button', { name: /SUBMIT/i });

        act(() => {
            userEvent.click(submitButton);
        });

        //first guess is displayed
        const firstGuess = screen.queryByRole('textbox', { name: /guess 1/i });
        expect(firstGuess).toBeInTheDocument();
        expect(firstGuess.textContent).toBe('0000');
        const firstGuessPegs = within(firstGuess).queryAllByRole('textbox', { name: /empty key peg/i });
        expect(firstGuessPegs.length).toBe(4);

        const firstButtonUp = screen.queryByRole('button', { name: /arrow up 1/i });

        act(() => {
            userEvent.click(firstButtonUp);
            userEvent.click(submitButton);
        });
        //second guess is displayed
        const secondGuess = screen.queryByRole('textbox', { name: /guess 2/i });
        expect(secondGuess.textContent).toBe('1000');
        const secondGuessRedPegs = within(secondGuess).queryAllByRole('textbox', { name: /red key peg/i });
        expect(secondGuessRedPegs.length).toBe(1);

        const thirdButtonDown = screen.queryByRole('button', { name: /arrow down 3/i });

        act(() => {
            for (let index = 0; index < 8; index++) {
                userEvent.click(thirdButtonDown);
            }
            userEvent.click(submitButton);
        });

        //third guess is displayed
        const thirdGuess = screen.queryByRole('textbox', { name: /guess 3/i });
        expect(thirdGuess.textContent).toBe('1020');
        const thirdGuessRedPegs = within(thirdGuess).queryAllByRole('textbox', { name: /red key peg/i });
        const thirdGuessWhitePegs = within(thirdGuess).queryAllByRole('textbox', { name: /white key peg/i });
        expect(thirdGuessRedPegs.length).toBe(1);
        expect(thirdGuessWhitePegs.length).toBe(1);

        const secondButtonUp = screen.queryByRole('button', { name: /arrow up 2/i });
        let fourthButtonUp = screen.queryByRole('button', { name: /arrow up 4/i });

        act(() => {
            for (let index = 0; index < 4; index++) {
                userEvent.click(secondButtonUp);
            }
            for (let index = 0; index < 3; index++) {
                userEvent.click(fourthButtonUp);
            }
            userEvent.click(submitButton);
        });

        //fourth guess is displayed
        const fourthGuess = screen.queryByRole('textbox', { name: /guess 4/i });
        expect(fourthGuess.textContent).toBe('1423');
        const fourthGuessRedPegs = within(fourthGuess).queryAllByRole('textbox', { name: /red key peg/i });
        const fourthGuessWhitePegs = within(fourthGuess).queryAllByRole('textbox', { name: /white key peg/i });
        expect(fourthGuessRedPegs.length).toBe(1);
        expect(fourthGuessWhitePegs.length).toBe(3);

        const secondButtonDown = screen.queryByRole('button', { name: /arrow down 2/i });
        const thirdButtonUp = screen.queryByRole('button', { name: /arrow up 3/i });

        act(() => {
            for (let index = 0; index < 2; index++) {
                userEvent.click(secondButtonDown);
            }
            userEvent.click(thirdButtonUp);
            userEvent.click(submitButton);
        });

        //fifth guess displayed
        const fifthGuess = screen.queryByRole('textbox', { name: /guess 5/i });
        expect(fifthGuess.textContent).toBe('1233');
        const fifthGuessRedPegs = within(fifthGuess).queryAllByRole('textbox', { name: /red key peg/i });
        const fifthGuessWhitePegs = within(fifthGuess).queryAllByRole('textbox', { name: /white key peg/i });
        expect(fifthGuessRedPegs.length).toBe(3);
        expect(fifthGuessWhitePegs.length).toBe(1);

        const fourthButtonUpSecondPush = screen.queryByRole('button', { name: /arrow up 4/i });

        act(() => {
            userEvent.click(fourthButtonUpSecondPush);
            userEvent.click(submitButton);
        });
        //sixth and final guess shown
        const sixthGuess = screen.queryByRole('textbox', { name: /guess 6/i });
        expect(sixthGuess.textContent).toBe('1234');
        const sixthGuessRedPegs = within(sixthGuess).queryAllByRole('textbox', { name: /red key peg/i });
        const sixthGuessWhitePegs = within(sixthGuess).queryAllByRole('textbox', { name: /white key peg/i });
        expect(sixthGuessRedPegs.length).toBe(4);
        expect(sixthGuessWhitePegs.length).toBe(0);

        expect(guessSelector).not.toBeInTheDocument();
        const gameWinSummary = screen.queryByRole('textbox', { name: /game win summary/i });
        expect(gameWinSummary).toBeInTheDocument();
        expect(gameWinSummary.textContent).toBe(`You Win!It took you 6 guesses to break the code!Play Again`);

        expect(screen.queryByRole('textbox', { name: /secret code display/i }).textContent).toBe('1234');

        const playAgainButton = screen.queryByRole('button', { name: /play again/i });
        userEvent.click(playAgainButton);

        const newGuessSelector = screen.queryByRole('menu', { name: /guess selector/i });
        expect(newGuessSelector).toBeInTheDocument();

        const anyListedGuesses = screen.queryAllByRole('textbox', { name: /guess/i });
        expect(anyListedGuesses.length).toBe(0);

        expect(screen.queryByRole('textbox', { name: /secret code display/i }).textContent).toBe('????');
    });


});