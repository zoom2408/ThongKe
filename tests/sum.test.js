const test = require('node:test');
const assert = require('node:assert');
const sum = require('../sum');

test('adds numbers', () => {
  assert.strictEqual(sum(1, 2), 3);
});
