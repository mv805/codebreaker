import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from "@testing-library/user-event";

import Guess from './Guess';

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

describe('Guess component', () => {

    it('displays the correct guess when generated', () => {
        render(<Guess 
        playerGuess={ [1, 2, 3, 4] } 
        guessKeys={['red', 'white', 'empty', 'empty']}/>, container);

        let displayedCode = screen.getAllByRole('textbox', {name: /guess digit/i}).map(digit => { return digit.textContent; }).join('');
        expect(displayedCode).toBe('1234');
    });

    describe('key pegs display', () => {
        //the pegs should display correctly
        it('RWWE', () => {
            render(<Guess 
            playerGuess={ [1, 2, 3, 4] } 
            guessKeys={['red', 'white', 'white', 'empty']}/>, container);
    
            let redPegs = screen.queryAllByRole('textbox', {name: /red key peg/i});
            let whitePegs = screen.queryAllByRole('textbox', {name: /white key peg/i});
            let emptyCells = screen.queryAllByRole('textbox', {name: /empty key peg/i});
            //screen.logTestingPlaygroundURL();
    
            expect(redPegs.length).toBe(1);
            expect(whitePegs.length).toBe(2);
            expect(emptyCells.length).toBe(1);
        });

        it('RRRR', () => {
            render(<Guess 
            playerGuess={ [1, 2, 3, 4] } 
            guessKeys={['red', 'red', 'red', 'red']}/>, container);
    
            let redPegs = screen.queryAllByRole('textbox', {name: /red key peg/i});
            let whitePegs = screen.queryAllByRole('textbox', {name: /white key peg/i});
            let emptyCells = screen.queryAllByRole('textbox', {name: /empty key peg/i});
            //screen.logTestingPlaygroundURL();
    
            expect(redPegs.length).toBe(4);
            expect(whitePegs.length).toBe(0);
            expect(emptyCells.length).toBe(0);
        });

        it('EEEE', () => {
            render(<Guess 
            playerGuess={ [1, 2, 3, 4] } 
            guessKeys={['empty', 'empty', 'empty', 'empty']}/>, container);
    
            let redPegs = screen.queryAllByRole('textbox', {name: /red key peg/i});
            let whitePegs = screen.queryAllByRole('textbox', {name: /white key peg/i});
            let emptyCells = screen.queryAllByRole('textbox', {name: /empty key peg/i});
            //screen.logTestingPlaygroundURL();
    
            expect(redPegs.length).toBe(0);
            expect(whitePegs.length).toBe(0);
            expect(emptyCells.length).toBe(4);
        });

    });
});