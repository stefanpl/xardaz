import { assert } from 'chai';
import { mustThrow } from '../src/mustThrow';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('mustThrow', () => {
  it('catches errors thrown in functions', async () => {
    await mustThrow(() => {
      throw Error(`Error!!`);
    });
  });
  it('throws if no error is raised inside the passed function', async () => {
    let errorHasBeenRaised = false;
    try {
      await mustThrow(() => {});
    } catch (err) {
      errorHasBeenRaised = true;
      assert.match(err.message, /should have raised an error/);
    }
    assert.isTrue(errorHasBeenRaised, 'mustThrow must raise an error here.');
  });
  it('must throw if the error message does not match', async () => {
    let errorHasBeenRaised = false;
    try {
      await mustThrow(() => {
        throw Error(`woof`);
      }, 'no barking allowed');
    } catch (err) {
      errorHasBeenRaised = true;
      assert.match(err.message, /Error message must contain/);
    }
    assert.isTrue(errorHasBeenRaised, 'mustThrow must raise an error here.');
  });
});

export default false;
