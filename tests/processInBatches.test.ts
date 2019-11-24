import { assert } from 'chai';
import { processInBatches } from '../src/processInBatches';
import { asyncDouble } from './helpers/asyncDouble';
import { testProcessingFunction } from './helpers/testProcessingFunction';
import { randomInt } from '../src/aliases';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const batchSize = 5;

describe('process in batches', () => {
  it('should process all functions', async () => {
    await testProcessingFunction((numbers, executor) => {
      return processInBatches(numbers, executor, batchSize);
    });
  });
  it('processes one batch after another', async () => {
    const processedNumbers: Array<number> = [];
    const someNumbers = Array.from(Array(100)).map(() => randomInt());
    await processInBatches(
      someNumbers,
      number => asyncDouble(number, processedNumbers),
      batchSize
    );
    // We expect the items in each batch to be ordered randomly,
    //  given that they should be executed in parallel.
    let batchesAreOrderedRandomly = false;
    // Withing each batch, the order of results must be random.
    // But each number of the batch must be contained in the corresponding processedNumber batch.
    for (let index = 0; index < someNumbers.length; index += batchSize) {
      const upperIndex = index + batchSize;
      const numberBatch = someNumbers.slice(index, upperIndex);
      const processedNumberBatch = processedNumbers.slice(index, upperIndex);
      // eslint-disable-next-line no-loop-func
      numberBatch.forEach((number, indexInBatch) => {
        if (processedNumberBatch.indexOf(number) === -1) {
          throw Error(`The batches are out of order!`);
        }
        if (processedNumberBatch.indexOf(number) !== indexInBatch) {
          batchesAreOrderedRandomly = true;
        }
      });
    }
    assert.isTrue(
      batchesAreOrderedRandomly,
      `The items seem to be processed in sequence,` +
        ` but each batch must be processed in parallel!`
    );
  });
});

export default false;
