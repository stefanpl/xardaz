import { assert } from 'chai';
import { mesasureExecutionTime, waitSomeTime, waitAndBlockSync } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const timeout = 10;

describe('measure execution time', () => {
  it('measures async functions', async () => {
    const executionTime = await mesasureExecutionTime(() =>
      waitSomeTime(timeout)
    );
    assert.isAtLeast(executionTime, timeout);
  });
  it('measures sync functions', async () => {
    const executionTime = await mesasureExecutionTime(() =>
      waitAndBlockSync(timeout)
    );
    assert.isAtLeast(executionTime, timeout);
  });
});

export default false;
