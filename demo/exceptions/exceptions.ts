
import { strict as assert } from 'assert';
/* eslint-disable */

// Exceptions are a way to handle errors and unexpected behavior in your code.
// When an exception occurs, it interrupts the normal flow of the program and
// jumps to a predefined error-handling routine. Exceptions can be used to
// catch and handle errors in a way that doesn't crash the program or cause
// unexpected behavior. Exceptions are thrown using the `throw` keyword and
// caught using the `try...catch` statement.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch


// Error exception - about throwing error on some exceptions that can happen
/**
 * 0. Using throw new Error to handle the exception
 *   Throwing the exceptions will exit the code ,
 *   Ideally we want to avoid such interruption and
 *   we use try and catch when we are about to execute 
 *   a code expression
 */
function divide(n1: number, n2: number): number {
	if(n2 === 0) throw new Error("Cannot divide by zero");
	return n1 / n2;
}

assert.equal( divide(1,1), 1);
// assert.equal( divide(1,0), typeof Error );

// Avoids to exit the program's execution on error thrown
try { const errorResult = divide(1, 0); }
catch ( e ){ console.error( e ) }
finally { console.info('\nDivision executed.') }

