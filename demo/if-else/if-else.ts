/* eslint-disable */
import { strict as assert } from "assert";

// Control flow is the order in which statements are executed in a program. It
// allows programmers to control the flow of their code based on certain
// conditions or events. Control flow structures include conditional
// statements, loops, and function calls, which allow for branching and
// repetition of code.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else


let result = 2 + 2;
assert.equal(result, 4);

function describeValueOddOrEven(n: number): string{
	let value;
	if( n % 2 === 0 ){
		value = 'even';
	} else if ( n % 2 > 0){
		value = 'odd';
	} else {
		value = 'there is something wrong';
	}
	return value;
}

// init check;
let value = describeValueOddOrEven(result)
assert.equal(value, 'even');

result = 5 + 2;
value = describeValueOddOrEven(result)
assert.equal(value, 'odd');

// @ts-ignore
result = 'hi';
value = describeValueOddOrEven(result)
assert.equal(value, 'there is something wrong');