import { WriteFileOptions, writeFile, readdir, mkdir } from 'fs';
import { promisify } from 'util';
import { AbsolutePath } from './types';

const writeFilePromised = promisify(writeFile);
export const readdirPromised = promisify(readdir);

export function writeUtf8File(
  file: AbsolutePath,
  contents: string = '',
  options: WriteFileOptions = {}
): Promise<void> {
  const defaultOptions: WriteFileOptions = {
    encoding: 'utf8',
  };
  const optionsToUse = Object.assign(options, defaultOptions);
  return writeFilePromised(file, contents, optionsToUse);
}

export const mkdirAsync = promisify(mkdir);

export async function directoryIsEmpty(
  directoryPath: AbsolutePath
): Promise<boolean> {
  const contents = await readdirPromised(directoryPath);
  return contents.length === 0;
}
