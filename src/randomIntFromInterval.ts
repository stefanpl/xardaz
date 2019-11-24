/**
 * Return a random integer between (including) the two given values.
 */
export function randomIntFromInterval(min: number, max: number) {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw Error(
      `randomIntFromInterval expects integer values for min/max,` +
        ` but was passed ${min} and ${max}.`
    );
  }
  if (max < min) {
    throw Error(
      `max value (${max}) may not be smaller than min (${min}) value.`
    );
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
