import { render } from '@testing-library/react';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { screen, within } from '@testing-library/dom';
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import renderer, { act } from "react-test-renderer";
import SecretCodeDisplay from './SecretCodeDisplay';

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

describe('Secret code display functionality', () => {

    it('should not show the code if hidden is true', () => {

        render(<SecretCodeDisplay
            hidden={ true }
            secretCode={ [1, 2, 3, 4] }
        />);

        let codeDisplay = screen.queryByRole('textbox', { name: /secret code display/i });
        expect(codeDisplay.textContent).toBe('????');
    });

    it('should show the code if hidden is false', () => {

        render(<SecretCodeDisplay
            hidden={ false }
            secretCode={ [1, 2, 3, 4] }
        />);

        let codeDisplay = screen.queryByRole('textbox', { name: /secret code display/i });
        expect(codeDisplay.textContent).toBe('1234');
    });
});