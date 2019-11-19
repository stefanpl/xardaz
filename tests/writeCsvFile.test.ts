import { assert } from 'chai';
import { file as createTempFile } from 'tmp-promise';
import { readCsvFile, writeCsvFile } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const dummyData = [
  {
    name: 'woof',
    age: 100,
  },
  {
    name: 'another',
    age: 200,
  },
  {
    name: 'third',
    age: 50,
  },
];

describe('writing csv files', () => {
  it('takes headers from objects automatically', async () => {
    const tmpFile = await createTempFile();
    await writeCsvFile(tmpFile.path, dummyData);
    const contents = await readCsvFile(tmpFile.path, true);
    assert.lengthOf(contents, dummyData.length);
    assert.hasAllKeys(contents[0], dummyData[0]);
  });
});

export default false;
