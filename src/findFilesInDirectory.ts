import * as recursiveReaddir from 'recursive-readdir';
import { resolve } from 'path';
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
  if (searchRecursively) {
    return recursiveReaddir(path);
  }
  return (await readdirPromised(path, { withFileTypes: true }))
    .filter(entry => entry.isFile())
    .map(entry => resolve(path, entry.name));
}
