import { JSONSchema7 } from 'json-schema';
import { ajv } from './validateDataAgainstJsonSchema';

export function isValidJsonSchema(data: JSONSchema7): boolean {
  return ajv.validateSchema(data);
}
