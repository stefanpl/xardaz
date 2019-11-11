import { assert } from 'chai';
import { JSONSchema7 } from 'json-schema';
import { isValidJsonSchema } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const validSchema: JSONSchema7 = {
  type: 'string',
  description: 'Just a very basic string schema',
};

const invalidSchema = {
  type: 'non-supported type',
};

describe('is valid json schema', () => {
  it('report true on valid schema files', async () => {
    assert.isTrue(await isValidJsonSchema(validSchema));
  });
  it('report false on invalid schema files', async () => {
    // @ts-ignore
    assert.isFalse(await isValidJsonSchema(invalidSchema));
  });
});

export default false;
