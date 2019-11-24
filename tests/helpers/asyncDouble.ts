/**
 * Doubles a value asynchronously with a random timeout.
 * It pushes each processed number to a provided array before resolving.
 *
 * @param {number} value The number to double
 * @param {Array<number>} processedNumberContainer Processed numbers are pushed into this array
 *
 * @return {Promise<number>} A promise resolving to (value * 2) after a random timeout
 */
export async function asyncDouble(
  val: number,
  processedNumberContainer: Array<number>
): Promise<number> {
  return new Promise(resolve => {
    // This will create the random ordering of items within batches.
    const timeout = Math.round(Math.random() * 5);
    setTimeout(() => {
      processedNumberContainer.push(val);
      resolve(val * 2);
    }, timeout);
  });
}
