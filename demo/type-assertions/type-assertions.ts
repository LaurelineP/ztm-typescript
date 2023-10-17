/* eslint-disable */
import { strict as assert } from "assert";

// Type assertions allow you to tell the compiler that a value should be
// considered a certain type, even if TypeScript cannot infer the type
// automatically. You can use type assertions to help the compiler recognize
// the types of variables, function return types, and more. When using type
// assertions, be sure to only assert types that are actually correct, as
// asserting an incorrect type can lead to runtime errors in your code.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions

/* Explicitly tells that x is a certain type: ensure it
 * is always the case before doing that otherwise this could
 * led to unexpected behaviors
*/
const greetings: unknown = 'hello';

// wrong case of using it!
// const greet = greetings as number;
// const n = greet + 2;
// console.log(n)


// type assertions allows to spawn the type methods & properties
const numChars = (greetings as string).length;


interface Employee {
	position(): string
}

class Manager implements Employee {
	position(): string{ return "Manager"};
	sayHello(): void {
		console.log("hi");
	}
}
/**
 * Adding the Employee type to Alice,
 * allows/prevents the use of methods 
 * not part of the type
 * --> here: sayHello is not accessible 
 */
const alice: Employee = new Manager();
alice.position()
console.log('alice', alice.position())
