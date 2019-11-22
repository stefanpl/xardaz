import { statAsync } from './fileSystem';
import { AbsolutePath } from './types';

export async function directoryExists(path: AbsolutePath): Promise<boolean> {
  try {
    await statAsync(path);
    return true;
  } catch (err) {
    return false;
  }
}
