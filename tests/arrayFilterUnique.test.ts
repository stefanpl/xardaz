import { assert } from 'chai';
import { randomIntFromInterval, arrayFilterUnique } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('arrayFilterUnique', () => {
  it('returns unique values', async () => {
    const n = 1000;
    const randomNumbers = Array.from(Array(n)).map(() =>
      randomIntFromInterval(0, 20)
    );
    const uniqueArray = randomNumbers.filter(arrayFilterUnique);
    const uniqueNumbers: Array<number> = [];
    uniqueArray.forEach(number => {
      assert.strictEqual(
        uniqueNumbers.indexOf(number),
        -1,
        `There was a duplicate entry in a supposedly unique array.`
      );
      uniqueNumbers.push(number);
    });
  });
});

export default false;
