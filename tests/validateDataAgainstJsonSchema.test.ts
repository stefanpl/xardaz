import { assert } from 'chai';
import { JSONSchema7 } from 'json-schema';
import { validateDataAgainstJsonSchema } from '../src/validateDataAgainstJsonSchema';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const schemaForString: JSONSchema7 = {
  type: 'string',
};

describe('validate data against json schema', () => {
  it('returns true and no errors for valid data', async () => {
    const string = 'a simple string';
    const validationResult = await validateDataAgainstJsonSchema(
      string,
      schemaForString
    );
    assert.isTrue(validationResult.isValid);
    assert.isEmpty(validationResult.errors);
  });

  it('returns false and an error for invalid data', async () => {
    const noString = 123;
    const validationResult = await validateDataAgainstJsonSchema(
      noString,
      schemaForString
    );
    assert.isFalse(validationResult.isValid);
    assert.lengthOf(validationResult.errors, 1);
  });
});

export default false;
