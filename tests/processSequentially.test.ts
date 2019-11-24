import { assert } from 'chai';
import { asyncDouble } from './helpers/asyncDouble';
import { processSequentially } from '../src/processSequentially';
import { testProcessingFunction } from './helpers/testProcessingFunction';
import { randomInt } from '../src/aliases';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('process sequentially', () => {
  it('should process all functions', async () => {
    await testProcessingFunction((values, executor) => {
      return processSequentially(values, executor);
    });
  });
  it('processes one item after another', async () => {
    const processedNumbers: Array<number> = [];
    const someNumbers = Array.from(Array(20)).map(() => randomInt());
    processedNumbers.length = 0;
    const results = await processSequentially(someNumbers, number =>
      asyncDouble(number, processedNumbers)
    );
    for (let index = 0; index < results.length; index++) {
      assert.strictEqual(results[index], someNumbers[index] * 2);
      assert.strictEqual(results[index], processedNumbers[index] * 2);
    }
  });
});

export default false;
