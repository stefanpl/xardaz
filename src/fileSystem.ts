import { WriteFileOptions, writeFile, readdir, mkdir, readFile } from 'fs';
import { promisify } from 'util';
import { AbsolutePath } from './types';

const writeFilePromised = promisify(writeFile);
const readFilePromised = promisify(readFile);
export const readdirPromised = promisify(readdir);

export function writeFileAsync(
  file: AbsolutePath,
  contents: string = '',
  options: any = {}
): Promise<void> {
  const defaultOptions = {
    encoding: 'utf8',
  };
  const optionsToUse = Object.assign(options, defaultOptions);
  return writeFilePromised(file, contents, optionsToUse);
}

export function readFileAsync(
  file: AbsolutePath,
  options: WriteFileOptions = {}
): Promise<string | Buffer> {
  const defaultOptions: WriteFileOptions = {
    encoding: 'utf8',
  };
  const optionsToUse = Object.assign(options, defaultOptions);
  return readFilePromised(file, optionsToUse);
}

export const mkdirAsync = promisify(mkdir);

export async function directoryIsEmpty(
  directoryPath: AbsolutePath
): Promise<boolean> {
  const contents = await readdirPromised(directoryPath);
  return contents.length === 0;
}
