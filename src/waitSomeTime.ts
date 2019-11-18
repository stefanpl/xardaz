export function waitSomeTime(timeoutInMs: number): Promise<void> {
  return new Promise(fulfill => setTimeout(fulfill, timeoutInMs));
}
