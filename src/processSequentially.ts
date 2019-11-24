import { processInBatches } from './processInBatches';

/**
 * Process a list of values sequentially through an async executor function.
 *
 * @param {Array} values List of values to process
 * @param {Function} executor An async function taking one argument
 * @return {Promise<Array>} List of results, ordered like the values array
 *
 */
export async function processSequentially<V, R>(
  values: Array<V>,
  executor: (value: V) => Promise<R>
): Promise<Array<R>> {
  return processInBatches(values, executor, 1);
}
