import { JSONSchema7 } from 'json-schema';
import Ajv, { ErrorObject } from 'ajv';

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
