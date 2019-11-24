import { assert } from 'chai';
import { buildUrl } from '../src/buildUrl';

declare const describe: Mocha.SuiteFunction;
declare const it: Mocha.TestFunction;

const baseUrlWithSlash = 'https://hatercater.de/';
const baseUrlWithoutSlash = baseUrlWithSlash.replace(/$\//, '');
const pathWithLeadingSlash = '/kommentare';
const pathWithoutSlash = pathWithLeadingSlash.replace(/^\//, '');
const correctUrl = `${baseUrlWithSlash}${pathWithoutSlash}`;

describe('build urls', () => {
  it('removes duplicate slashes', async () => {
    const joinedUrl = buildUrl(baseUrlWithSlash, pathWithLeadingSlash);
    assert.strictEqual(correctUrl, joinedUrl);
  });
  it('inserts a slash if required', async () => {
    const joinedUrl = buildUrl(baseUrlWithoutSlash, pathWithoutSlash);
    assert.strictEqual(correctUrl, joinedUrl);
  });
  it('converts numbers to strings', async () => {
    const number = 123;
    const joinedUrl = buildUrl(baseUrlWithSlash, number);
    assert.strictEqual(joinedUrl, `${baseUrlWithSlash}${number}`);
  });
});

export default false;
