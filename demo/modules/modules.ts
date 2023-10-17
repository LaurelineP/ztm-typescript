/* eslint-disable */
import { strict as assert } from "assert";
import { HUNDRED, MIN } from './constants';
import { sum } from './math';
// ES modules provide a way to organize code into separate files that can be
// imported and used in other files.To use an ES module, the the `import`
// keyword is used.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/modules.html


const result = sum(HUNDRED, MIN);

assert.equal(result, 60100);