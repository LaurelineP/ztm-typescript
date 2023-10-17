/* eslint-disable */
import { strict as assert } from "assert";

// Arrow functions provide a concise syntax for defining functions. They are
// defined using a fat arrow (=>) and can be used in place of traditional
// function expressions. Arrow functions automatically bind the 'this' keyword
// to the parent context, making them useful in event handlers and callback
// functions. They also support implicit return statements for one-liner
// functions, which makes the code more readable.
// 
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// A function expression but not the best syntax
const sum0 = function (n1: number, n2: number): number {
	return n1 + n2;
}

// prefer using arrow function ( without the function keyword )
const sum1 = (n1: number, n2: number): number => {
	return n1 + n2;
}

assert.equal([sum0, sum1].every(fn => typeof fn(1,2) === 'number'), true);