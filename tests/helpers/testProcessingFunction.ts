import { assert } from 'chai';
import { randomInt } from '../../src/aliases';
import { asyncDouble } from './asyncDouble';

export async function testProcessingFunction(
  invoker: (
    values: Array<number>,
    executor: (input: number) => Promise<number>
  ) => Promise<Array<number>>
) {
  const someNumbers = Array.from(Array(20)).map(() => randomInt());
  const processedNumbers: Array<number> = [];
  const executor = number => asyncDouble(number, processedNumbers);
  const results = await invoker(someNumbers, executor);
  results.forEach((result, index) => {
    assert.strictEqual(result, someNumbers[index] * 2);
  });
  assert.lengthOf(results, someNumbers.length);
  assert.lengthOf(processedNumbers, someNumbers.length);
  const origSum = someNumbers.reduce((acc, curr) => acc + curr);
  const doubleSum = results.reduce((acc, curr) => acc + curr);
  assert.strictEqual(doubleSum, origSum * 2);
}
