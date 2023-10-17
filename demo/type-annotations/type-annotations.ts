/* eslint-disable */
import { strict as assert } from "assert";

// Type annotations are used to provide type information for variables,
// functions, and other data structures in a program. By adding type
// annotations, you can specify the expected types of data and prevent errors
// that could occur from using the wrong type. This allows for better code
// reliability, maintainability, and readability.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables

const name: string = "Lowla";
const age: number = Infinity;
const greetings: string = "Aloha!"
const bigIntegerNumber: bigint = 9000n + 1n;
const yes: boolean = true;


// type assertion describing parameters and what it returns:
// by default a function return type is void
function logMultiply(n1: number, n2: number): void{
	const result: number = n1 * n2;
	console.log(result);
}

// type assertion describing parameters and what it returns:
// here the function return a type of "number";
function returnMultiply(n1: number, n2: number): number {
	const result: number = n1 * n2;
	return result;
}

const loggedExec: void = logMultiply(2,2);
const returnedExec: number = returnMultiply(2,2);

assert.equal(typeof(loggedExec), 'undefined');
assert.equal(typeof(returnedExec), 'number');
