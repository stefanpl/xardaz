import { assert } from 'chai';
import { getRandomTmpName, downloadFile, readFileAsync } from '../src';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const testFileUrl = 'https://www.google.de/robots.txt';
const expectedContents = ['User-agent', 'Allow', 'Disallow'];

describe('download file', () => {
  it('downloads a file', async () => {
    const filePath = getRandomTmpName();
    await downloadFile(testFileUrl, filePath);
    const fileContents = await readFileAsync(filePath);
    expectedContents.forEach(content => {
      assert.isTrue(fileContents.indexOf(content) > -1);
    });
  });
});

export default false;
