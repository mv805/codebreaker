import { render, screen } from '@testing-library/react';
import App from './App';
import { codeGenerator } from './codeGenerator';


// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

describe('Code Generator functionality', () => {
  it(`should generate a code >= '0000' and <= '9999'`, () => {
    let testCodeList = [];
    for (let index = 0; index < 10000; index++) {
      let code = codeGenerator();
      expect(parseInt(code.join(''))).toBeGreaterThanOrEqual(0);
      expect(parseInt(code.join(''))).toBeLessThanOrEqual(9999);
      testCodeList.push(code.join(''));
    }
    console.log(testCodeList);
  });
});
