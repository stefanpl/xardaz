import quickTest from './quickTest';
import './findFilesInDirectory.test';
import './validateDataAgainstJsonSchema.test';
import './mustThrow.test';
import './isValidJsonSchema.test';
import './buildUrl.test';
import './readCsvFile.test';
import './writeCsvFile.test';
import './processInBatches.test';
import './processSequentially.test';
import './processInParallel.test';
import './randomIntFromInterval.test';
import './directoryExists.test';
import './waitAndBlockSync.test';
import './downloadFile.test';
import './mesasureExecutionTime.test';
import './arrayFilterUnique.test';
import '../src/index';

declare const it: Mocha.TestFunction;

if (process.env.RUN_QUICK_TEST) {
  it.only('just makes a quick test', quickTest);
}
