import * as recursiveReaddir from 'recursive-readdir';
import { readdirPromised } from './fileSystem';
import { AbsolutePath } from './types';

/**
 * @param {string} glob – glob pattern to match files against
 */
export async function findFilesInDirectory(
  path: AbsolutePath,
  glob: string = '*',
  searchRecursively: boolean = false
): Promise<Array<AbsolutePath>> {
  if (glob !== '*') {
    throw Error(`'glob' parameter not yet implmeneted!`);
  }
  const files = await (searchRecursively
    ? readdirPromised(path)
    : recursiveReaddir(path));
  return files;
}
