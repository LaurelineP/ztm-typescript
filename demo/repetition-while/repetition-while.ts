/* eslint-disable */

// A `while` loop executes the body while (as long as) some boolean expression
// is `true`. It is your responsibility to manage when and how the loop exits.
// 
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
let shouldRun = true;
let count = 0;

while( count <= 5){
	console.log("count", count);
	count += 1;
}
console.log("now");