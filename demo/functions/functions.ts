/* eslint-disable */
import { strict as assert } from "assert";

// Functions are an essential component of programming that help organize code
// and make it more modular. A function is a block of code that can be called
// multiple times throughout a program with different inputs, allowing you to
// reuse code and save time. Functions can perform specific tasks or return
// values, and they can be used to break down complex problems into smaller,
// more manageable pieces. By using functions, you can reduce redundancy,
// improve code readability, and make it easier to maintain and update your
// code.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/functions.html


// function definition
function sayHello(){
	console.log('hello');
}
sayHello();

// function expression
const expressGreetings = function () { console.log('greetings!')}
expressGreetings();


// function expression (arrow function)
const expressHi = () => console.log('hi');
expressHi();


function count ( n1, n2){
	return n1 + n2;
}
const result = count(5,5);
assert.equal(result, 10)