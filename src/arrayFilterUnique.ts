/**
 * Returns unique elements when passed as a callback to Array.filter().
 */
export function arrayFilterUnique(value, index, self) {
  return self.indexOf(value) === index;
}
