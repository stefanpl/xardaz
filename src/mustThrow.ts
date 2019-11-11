import { assert } from 'chai';

export async function mustThrow(
  functionExpectedToThrow: Function,
  expectedErrorRegex?: string
): Promise<void> {
  let errorHasBeenCaught = false;
  try {
    await functionExpectedToThrow();
  } catch (e) {
    errorHasBeenCaught = true;
    if (expectedErrorRegex) {
      const regex = new RegExp(expectedErrorRegex, 'i');
      const errorMessageContainsRegex = !!e.message.match(regex);
      assert.strictEqual(
        errorMessageContainsRegex,
        true,
        `Error message must contain regex '${expectedErrorRegex}', but was '${e.message}'.`
      );
    }
  } finally {
    const functionName = functionExpectedToThrow.name || '[anonymous function]';
    assert.strictEqual(
      errorHasBeenCaught,
      true,
      `The given function '${functionName}' should have raised an error.`
    );
  }
}
