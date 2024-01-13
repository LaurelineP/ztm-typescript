// Write a generic function that can locate the first occurrence of an item in an array.
// The function should accept an array of any type as a parameter, 				==========[ param: array of any type ]
// along with an element to locate. If the element is found in the array, then	==========[ param: element to locate ]
// the function should return the index of where that element exists in the		==========[ returns element's index | undefined]
// array. If the element does not exist in the array, then the function should
// return `undefined`.
//
// To test that your function works properly, perform these steps:
// 1. Run your function with the existing `numbers` array and try to find the element 3 	====== find element 3 with function
// 2. Assert that the index returned is 2															===> assert return = 2				
// 3. Run your function with the existing `numbers` array and try to find the element 6		======ind element 6 with function	
// 4. Assert that your function returns `undefined`													===> assert return = undefined

import { strict as assert } from "assert";

const numbers: number[] = [1, 2, 3, 4, 5];

/* ------------------------------ BEFORE COURSE ----------------------------- */
// Attempt without generic function ( before course )
// const searchIndexOfNumber = (n: number, arrNumber: number[] = numbers): number | undefined => 
// 	arrNumber.includes(n) ? arrNumber.indexOf(n) : undefined;
// assert.equal(searchIndexOfNumber(3), 2);
// assert.equal(searchIndexOfNumber(6), undefined);



/* ------------------------------ AFTER COURSE ------------------------------ */
// Attempt with generic function ( after course )
function searchIndexFromArray<T>(arr: T[], element: T): number | undefined {
	const index = arr.findIndex(value => value === element);
	if (index === -1) return;
	return index;
}

assert(() => searchIndexFromArray(numbers, 3) === 2);
assert(() => searchIndexFromArray(numbers, 6) === undefined);


