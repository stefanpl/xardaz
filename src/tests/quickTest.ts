import * as assert from 'assert';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('just some quick test', () => {
  it('should be green', async () => {
    const lengthEqualsFour = 'some'.length === 4;
    assert(lengthEqualsFour, 'The length should indeed be 4');
  });
});

export default false;
