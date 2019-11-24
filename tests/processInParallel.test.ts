import { assert } from 'chai';
import { processInParallel } from '../src/processInParallel';
import { testProcessingFunction } from './helpers/testProcessingFunction';
import { randomInt, processInBatches, mesasureExecutionTime } from '../src';
import { asyncDouble } from './helpers/asyncDouble';
import { processSequentially } from '../src/processSequentially';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('process in parallel', () => {
  it('should process all functions', async () => {
    await testProcessingFunction((numbers, executor) => {
      return processInParallel(numbers, executor);
    });
  });
  it('should be faster than a batched or sequential execution', async () => {
    const numbers = Array.from(Array(100)).map(() => randomInt());
    const executor = number => asyncDouble(number, []);
    const [
      executionTimeParallel,
      executionTimeBatched,
      executionTimeSequential,
    ] = await Promise.all([
      mesasureExecutionTime(() => processInParallel(numbers, executor)),
      // Process in two batches.
      mesasureExecutionTime(() =>
        processInBatches(numbers, executor, numbers.length / 2)
      ),
      mesasureExecutionTime(() => processSequentially(numbers, executor)),
    ]);
    assert.isTrue(
      executionTimeParallel < executionTimeBatched,
      'Parallel execution should be faster than batched.'
    );
    assert.isTrue(
      executionTimeParallel < executionTimeSequential,
      'Parallel execution should be faster than sequential.'
    );
    assert.isTrue(
      executionTimeBatched < executionTimeSequential,
      'Batched execution should be faster than sequential.'
    );
  });
});

export default false;
