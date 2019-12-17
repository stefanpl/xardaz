import * as parse from 'csv-parse';
import { AbsolutePath } from './types';
import { readFileAsync } from './fileSystem';

/**
 * Warning: This function is intended to read relatively small data sets.
 * It does not use a streaming api, but puts everything in memory.
 *
 * Reads a given file (assumed to be utf8) and returns its contents.
 *
 * @param {AbsolutePath} path – utf8 csv file to read
 * @param {boolean} fileContainsHeaderRow – whether the first row in the csv contains header data
 *
 * @return {Promise<Array<Object | Array<any>>>} – In case a header row is present,
 *  it is used as keys for an object. Otherwise, rows are returned as arrays.
 */
export async function readCsvFile(
  path: AbsolutePath,
  fileContainsHeaderRow: boolean,
  options?: parse.Options
): Promise<Array<Object | Array<any>>> {
  const input = await readFileAsync(path);
  return new Promise((fulfill, reject) => {
    parse(
      input,
      Object.assign({}, options, {
        columns: fileContainsHeaderRow,
      }),
      (err, output) => {
        if (err) {
          reject(err);
        } else {
          fulfill(output);
        }
      }
    );
  });
}
