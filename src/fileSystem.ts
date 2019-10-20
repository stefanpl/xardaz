import { WriteFileOptions, writeFile } from 'fs';
import { promisify } from 'util';
import { AbsolutePath } from './types';

const writeFilePromised = promisify(writeFile);

export function writeUtf8File(
  file: AbsolutePath,
  contents: string,
  options: WriteFileOptions = {}
): Promise<void> {
  const defaultOptions: WriteFileOptions = {
    encoding: 'utf8',
  };
  const optionsToUse = Object.assign(options, defaultOptions);
  return writeFilePromised(file, contents, optionsToUse);
}
