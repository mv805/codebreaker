//clicking the arrows and cyling through all nubmers and back to 0 or 9
//displaying the current guess correctly



// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// describe('Code Generator functionality', () => {
//   const CODES_GENERATED = 10000;

//   it(`should generate a code >= '0000' and <= '9999'`, () => {
//     let testCodeList = [];
//     for (let index = 0; index < TEST_RUNS; index++) {
//       let code = codeGenerator();
//       expect(parseInt(code.join(''))).toBeGreaterThanOrEqual(0);
//       expect(parseInt(code.join(''))).toBeLessThanOrEqual(9999);
//       testCodeList.push(code.join(''));
//     }
//     console.log(testCodeList);
//   });

//   it('should return a 4 digit array as the code', () => {

//     let testCode;

//     for (let index = 0; index < TEST_RUNS; index++) {
//       testCode = codeGenerator();
//       expect(testCode.length).toEqual(4);
//       expect(testCode.length).not.toBeLessThanOrEqual(3);
//       expect(testCode.length).not.toBeGreaterThanOrEqual(5);
//     }

//   });

// });
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { codeGenerator } from '../codeGenerator';

import GuessSelectionPanel from './GuessSelectionPanel';

const CODES_GENERATED = 10;
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

    
    generatedTestCodes.forEach(testCase => {
        it("displays the correct guess in the display", () => {
            render(<GuessSelectionPanel
                currentGuess={ testCase }
            />, container);

            let codeOnScreen = screen.getAllByText(/[0-9]/i).map(digit => { return digit.textContent; }).join('');
            expect(codeOnScreen).toBe(`${ testCase.join('') }`);

        });

    });

});
