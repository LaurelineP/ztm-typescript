// Write a generic function that can calculate the average of numbers in an
// array. The function should operate on types that are compatible with
// numbers, but should not work on non-numeric types, such as strings or
// booleans.
//
// To calculate an average:
// 1. Sum the numbers in the array
// 2. Divide the sum by the number of elements
//
// To confirm that your program runs as expected:
// 1. Run your function on the given `numbers` array
// 2. Assert that the average is 3

import { strict as assert } from "assert";

const numbers: number[] = [1, 2, 3, 4, 5];
let result = NaN;
const sum = (arr: number[]): number => arr.reduce((acc, val): number => acc + val, 0);

result = sum(numbers)
assert.equal( sum(numbers), 15);

result = result / numbers.length;
assert.equal(result, 3);