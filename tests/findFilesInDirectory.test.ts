import { assert } from 'chai';
import { resolve, isAbsolute } from 'path';
import { findFilesInDirectory } from '../src/findFilesInDirectory';
import { createTestingDirectory } from './helpers/createTestingDirectory';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('find files in directory', () => {
  it('does not recurse into subdirectories, does not output folders', async () => {
    const testDir = await createTestingDirectory();
    const files = await findFilesInDirectory(resolve(testDir, 'photos'));
    assert.lengthOf(files, 1);
    assert.isTrue(
      isAbsolute(files[0]),
      `Paths must be absolute. Got: ${files[0]}`
    );
  });
  it('find files recursively', async () => {
    const testDir = await createTestingDirectory();
    const files = await findFilesInDirectory(testDir, undefined, true);
    assert.lengthOf(files, 5);
    assert.isTrue(
      isAbsolute(files[0]),
      `Paths must be absolute. Got: ${files[0]}`
    );
  });
});

export default false;
