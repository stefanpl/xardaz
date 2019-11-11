import { JSONSchema7 } from 'json-schema';
import { ErrorObject } from 'ajv'; // eslint-disable-line
import * as Ajv from 'ajv'; // eslint-disable-line
import axios from 'axios';

interface JSONSchemaValidationResult {
  isValid: boolean;
  errors: Array<ErrorObject>;
}

export const ajv = new Ajv({
  loadSchema: uri => {
    return axios.get(uri);
  },
});

export async function validateDataAgainstJsonSchema(
  data: any,
  schema: JSONSchema7
): Promise<JSONSchemaValidationResult> {
  const validate = await ajv.compileAsync(schema);
  const isValid = await validate(data);
  return {
    isValid: !!isValid,
    errors: validate.errors || [],
  };
}
