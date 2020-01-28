/**
 * Process a list of values in batches through an async executor function.
 * The values within each batch will be processed in parallel.
 * The batches are processed sequentially, one after another.
 *
 * @param {Array} inputValues List of values to process
 * @param {Function} executor An async function taking one argument
 * @param {number} batchSize How many values will be processed in parallel
 * @return {Promise<Array>} List of results, ordered like the values array
 *
 */
export async function processInBatches<V, R>(
  inputValues: Array<V>,
  executor: (value: V) => Promise<R>,
  batchSize: number
): Promise<Array<R>> {
  const results: Array<R> = [];
  for (let index = 0; index < inputValues.length; index += batchSize) {
    const batchItems = inputValues.slice(index, index + batchSize);
    const resultsPromise = Promise.all(batchItems.map(item => executor(item)));
    // eslint-disable-next-line
    results.push(...(await resultsPromise));
  }
  return results;
}
