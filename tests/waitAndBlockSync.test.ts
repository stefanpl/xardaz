import { assert } from 'chai';
import { waitAndBlockSync } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('wait and block sync', () => {
  it('waits for a given time', async () => {
    const timeout = 50;
    const start = Date.now();
    waitAndBlockSync(timeout);
    const end = Date.now();
    assert.isAtLeast(end, start + timeout);
  });
});

export default false;
