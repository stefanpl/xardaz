import { assert } from 'chai';
import { getRandomTmpName } from '../src/aliases';
import { mkdirAsync, directoryExists } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('directory exists', () => {
  it('return true on existing dirs', async () => {
    const path = getRandomTmpName();
    await mkdirAsync(path);
    assert.isTrue(await directoryExists(path));
  });
  it('return false on non-existing dirs', async () => {
    const path = getRandomTmpName();
    assert.isFalse(await directoryExists(path));
  });
});

export default false;
