import { JSONSchema7 } from 'json-schema';
import { ErrorObject } from 'ajv'; // eslint-disable-line
import * as Ajv from 'ajv'; // eslint-disable-line

interface JSONSchemaValidationResult {
  isValid: boolean;
  errors: Array<ErrorObject>;
}

const ajv = new Ajv({});

export async function validateDataAgainstJsonSchema(
  data: any,
  schema: JSONSchema7
): Promise<JSONSchemaValidationResult> {
  const validate = ajv.compile(schema);
  const isValid = await validate(data);
  return {
    isValid: !!isValid,
    errors: validate.errors || [],
  };
}
