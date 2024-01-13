/* eslint-disable */
import { strict as assert } from "assert";

// Generic functions are functions that are designed to work with different
// types of data. They allow you to create a function that can be used with
// various types of data without having to write a separate function for each
// type. This makes your code more efficient, reusable, and easier to maintain.
// Generic functions are especially useful when working with collections of
// data, such as arrays, because they allow you to create a function that can
// work with any type of data in the collection.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics


/**
 * Avoids repetitive type definition by encapsulating the type in a generic function.
 * `T` would substitute any given type by inferring it from the value passed to the function
 */

/**
 * [ a function definition each ]
 * Instead of doing the following...
 */
const getFirstNumber = (arr: number[]): number => arr[0];
const getStringNumber = (arr: string[]): string => arr[0];

/**
 * [ union type ]
 * We could do the one following using union type...
 * Note: each time we want to add a new type, we need to add it to the union type
 * ( whereas with generic - it will be inferred )
*/
type ArrayType = number[] | string[];

const arrStr: ArrayType = ['a', 'b', 'c'];
const arrNumbers: ArrayType = [1, 2, 3];
const getFirstStringOrNumber = (arr: ArrayType) => {
	if (!arr.length) return
	return arr[0];
};


/**
 * [ generic function ]
 * Generic function will infer form the Generic Type `T` the value
 * without having to define any union type
 */

function getFirst<T>(arr: T[]): T | undefined {
	if (!arr.length) return
	return arr[0];
};
const firstStr = getFirst(['a', 'b', 'c']);
const firstNumber = getFirst([1, 2, 3]);

// 👎 TS is not able to infer the correct type from a mixed array
const firstThing = getFirst([true, 'hey', {}, 3]);