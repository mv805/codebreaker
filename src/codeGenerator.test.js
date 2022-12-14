import { codeGenerator } from './codeGenerator';

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
    });

    it('should return a 4 digit integer array as the code', () => {

        let testCode;

        for (let index = 0; index < TEST_RUNS; index++) {
            testCode = codeGenerator();
            expect(testCode.length).toEqual(4);
            expect(testCode.length).not.toBeLessThanOrEqual(3);
            expect(testCode.length).not.toBeGreaterThanOrEqual(5);
            testCode.forEach(number => {
                expect(typeof number).toBe("number");
            });
        }

    });

});