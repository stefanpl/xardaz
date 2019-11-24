export async function mesasureExecutionTime(fn: Function): Promise<number> {
  const start = Date.now();
  await Promise.resolve(fn());
  const end = Date.now();
  return end - start;
}
