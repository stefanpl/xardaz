import { assert } from 'chai';
import { randomIntFromInterval, mustThrow } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const n = 100000;
const numberOfOutcomes = 20;
const allowedDeviation = 0.95;

function testResults(startingFrom: number) {
  const results: Record<number, number> = {};
  const min = startingFrom;
  const max = min + numberOfOutcomes - 1;
  const expectedFrequency = n / numberOfOutcomes;
  for (let run = 0; run < n; run++) {
    const result = randomIntFromInterval(min, max);
    results[result] = results[result] ? results[result] + 1 : 1;
  }
  for (let numberToCheck = min; numberToCheck <= max; numberToCheck++) {
    assert.exists(
      results[numberToCheck],
      `Expected result ${numberToCheck} was not found.`
    );
    const deviation = Math.min(
      results[numberToCheck] / expectedFrequency,
      expectedFrequency / results[numberToCheck]
    );
    assert.isTrue(
      deviation > allowedDeviation,
      `There was a deviation of ${deviation}!`
    );
  }
}

describe('random int from interval', () => {
  it('includes all values when starting at 0', async () => {
    testResults(0);
  });
  it('includes all values when starting at 50', async () => {
    testResults(50);
  });
  it('throws an error when either value is a float or max < min', async () => {
    await Promise.all(
      [
        () => randomIntFromInterval(0.5, 10),
        () => randomIntFromInterval(0, 5.5),
        () => randomIntFromInterval(10, 5),
      ].map(fn => mustThrow(fn))
    );
  });
});

export default false;
