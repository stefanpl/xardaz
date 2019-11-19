import { assert } from 'chai';
import { resolve } from 'path';
import { readCsvFile, AbsolutePath } from '../src';
import { mockDataDir } from '../src/directoryPaths';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const csvWithHeaders: AbsolutePath = resolve(
  mockDataDir,
  'csv',
  'simple-csv-with-headers.csv'
);
const csvWithoutHeaders: AbsolutePath = resolve(
  mockDataDir,
  'csv',
  'simple-csv-without-headers.csv'
);

describe('reading csv files', () => {
  it('parses existing headers', async () => {
    const csvData = await readCsvFile(csvWithHeaders, true);
    assert.lengthOf(csvData, 4);
    assert.containsAllKeys(csvData[0], ['id', 'comment', 'text']);
  });
  it('returns an array of arrays', async () => {
    const csvData = await readCsvFile(csvWithoutHeaders, false);
    assert.lengthOf(csvData, 4);
    assert.isArray(csvData[0]);
  });
});

export default false;
