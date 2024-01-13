// Write a generic function that can calculate the average of numbers in an 		=== function calculate numbers[] average ===
// array. The function should operate on types that are compatible with					=== param: array of numbers
// numbers, but should not work on non-numeric types, such as strings or				=== return undefined | number
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



/* ------------------------------ BEFORE COURSE ----------------------------- */
// let result = NaN;
// const sum = (arr: number[]): number => arr.reduce((acc, val): number => acc + val, 0);

// result = sum(numbers)
// assert.equal(sum(numbers), 15);

// result = result / numbers.length;
// assert.equal(result, 3);




/* ------------------------------ AFTER COURSE ------------------------------ */
function calculateAverage<T>(arr: T[]): number | undefined {
	if (arr.length === 0) return;
	if (arr.some(value => typeof value !== 'number')) return;

	const average = numbers.reduce((total, n) => total + n, 0) / numbers.length;
	return average;
}

assert(() => calculateAverage(numbers) === 3);