import { assert } from 'chai';

export default async function quickTest() {
  this.timeout(0);
  assert.strictEqual('huhu'.length, 4, 'The length should be four');
}
