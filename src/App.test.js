import { render, screen } from '@testing-library/react';
import App from './App';
import { codeGenerator } from './codeGenerator';


// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

describe('Code Generator functionality', () => {
  const TEST_RUNS = 10000;

  it(`should generate a code >= '0000' and <= '9999'`, () => {
    let testCodeList = [];
    for (let index = 0; index < TEST_RUNS; index++) {
      let code = codeGenerator();
      expect(parseInt(code.join(''))).toBeGreaterThanOrEqual(0);
      expect(parseInt(code.join(''))).toBeLessThanOrEqual(9999);
      testCodeList.push(code.join(''));
    }
    console.log(testCodeList);
  });

  it('should return a 4 digit array as the code', () => {

    let testCode;

    for (let index = 0; index < TEST_RUNS; index++) {
      testCode = codeGenerator();
      expect(testCode.length).toEqual(4);
      expect(testCode.length).not.toBeLessThanOrEqual(3);
      expect(testCode.length).not.toBeGreaterThanOrEqual(5);
    }

  });

});
