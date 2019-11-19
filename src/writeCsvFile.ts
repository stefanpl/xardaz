import * as stringify from 'csv-stringify';
import { AbsolutePath } from './types';
import { writeFileAsync } from './fileSystem';

export async function writeCsvFile(
  path: AbsolutePath,
  data: Array<any>
): Promise<void | string> {
  const string: string = await new Promise((fulfill, reject) => {
    stringify(
      data,
      {
        columns: Object.keys(data[0]),
        header: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (!result) {
            reject(Error(`Failed to stringify contents!`));
          }
          fulfill(result);
        }
      }
    );
  });
  return writeFileAsync(path, string);
}
