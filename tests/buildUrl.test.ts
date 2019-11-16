import { assert } from 'chai';
import { buildUrl } from '../src/buildUrl';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

describe('build urls', () => {
  it('removes duplicate slashes valid url', async () => {
    const baseUrl = 'https://hatercater.de/';
    const path = '/kommentare';
    const joinedUrl = buildUrl(baseUrl, path);
    const pathWithoutSlash = path.replace(/^\//, '');
    assert.strictEqual(`${baseUrl}${pathWithoutSlash}`, joinedUrl);
  });
});

export default false;
