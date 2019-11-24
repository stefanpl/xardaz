/**
 * This function will synchronously wait,
 *  e.g. block the process, for a number of milliseconds.
 *
 * @param {number} timeInMs
 */
export function waitAndBlockSync(timeInMs: number) {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (start + timeInMs <= Date.now()) return;
  }
}
