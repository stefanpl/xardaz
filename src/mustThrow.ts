export async function mustThrow(
  functionExpectedToThrow: Function,
  expectedErrorRegex?: string
): Promise<void> {
  return new Promise(async (fulfill, reject) => {
    let errorHasBeenCaught = false;
    try {
      await functionExpectedToThrow();
    } catch (e) {
      errorHasBeenCaught = true;
      if (expectedErrorRegex) {
        const regex = new RegExp(expectedErrorRegex, 'i');
        const errorMessageContainsRegex = !!e.message.match(regex);
        if (!errorMessageContainsRegex) {
          reject(
            new Error(
              `Error message must contain regex '${expectedErrorRegex}', but was '${e.message}'.`
            )
          );
        }
      }
    } finally {
      const functionName =
        functionExpectedToThrow.name || '[anonymous function]';
      if (!errorHasBeenCaught) {
        reject(
          new Error(
            `The given function '${functionName}' should have raised an error.`
          )
        );
      }
      fulfill();
    }
  });
}
