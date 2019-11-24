import { assert } from 'chai';
import { processInBatches } from '../src/processInBatches';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const processedNumbers: Array<number> = [];

async function asyncDouble(val: number): Promise<number> {
  return new Promise(resolve => {
    // This will create the random ordering of items within batches.
    const timeout = Math.round(Math.random() * 5);
    setTimeout(() => {
      processedNumbers.push(val);
      resolve(val * 2);
    }, timeout);
  });
}

const someNumbers = Array.from(Array(100)).map(() =>
  Math.round(Math.random() * 100)
);

const batchSize = 5;

describe('process in batches', () => {
  it('should process all functions', async () => {
    const results = await processInBatches(
      someNumbers,
      number => asyncDouble(number),
      batchSize
    );
    results.forEach((result, index) => {
      assert.strictEqual(result, someNumbers[index] * 2);
    });
    assert.lengthOf(results, someNumbers.length);
    assert.lengthOf(processedNumbers, someNumbers.length);
    const origSum = someNumbers.reduce((acc, curr) => acc + curr);
    const doubleSum = results.reduce((acc, curr) => acc + curr);
    assert.strictEqual(doubleSum, origSum * 2);
  });
  it('processes one batch after another', async () => {
    processedNumbers.length = 0;
    await processInBatches(
      someNumbers,
      number => asyncDouble(number),
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
