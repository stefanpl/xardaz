import { resolve } from 'path';
import { AbsolutePath } from './types';

export const baseDir: AbsolutePath = resolve(__dirname, './../');
export const mockDataDir: AbsolutePath = resolve(baseDir, './tests/mock-data');
