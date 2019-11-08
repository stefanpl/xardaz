import { assert } from 'chai';
import { findFilesInDirectory } from '../src/findFilesInDirectory';
import { createTestingDirectory } from './helpers/createTestingDirectory';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('find files in directory', () => {
  it('find all files', async () => {
    const testDir = await createTestingDirectory();
    const files = await findFilesInDirectory(testDir);
    assert.lengthOf(files, 4);
  });
});

export default false;
