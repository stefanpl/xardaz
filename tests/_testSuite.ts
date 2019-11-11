import quickTest from './quickTest';
import './findFilesInDirectory.test';
import './validateDataAgainstJsonSchema.test';
import './mustThrow.test';
import '../src/index';

declare const it: Mocha.TestFunction;

if (process.env.RUN_QUICK_TEST) {
  it.only('just makes a quick test', quickTest);
}
