/* eslint-disable */
import { strict as assert } from "assert";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math


const add = 1 + 1;
assert.equal(add, 2);

const sub = 2 - 1;
assert.equal(sub, 1);

const mul = 3 * 3;
assert.equal(mul, 9);

const div = 4 / 2;
assert.equal(div, 2);

const infinity = 5 / 0;
assert.equal(infinity, Infinity);

const nan = 0 / 0;
assert(isNaN(nan));

const modulo_rem = 10 % 3;
assert.equal(modulo_rem, 1);

const neg1 = -modulo_rem;
assert.equal(neg1, -1);

const neg2 = -neg1;
assert.equal(neg2, 1);

const exp = 2 * 2;
assert.equal(exp, 4);

const abs = Math.abs(-5);
assert.equal(abs, 5);

const pi = Math.PI;