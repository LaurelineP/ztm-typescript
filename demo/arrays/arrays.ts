/* eslint-disable */
import { strict as assert } from "assert";

// Arrays offer a way to store and manipulate collections of values of the same
// type. They are defined using square brackets and can be populated with
// values at initialization, or later using various methods such as push(),
// splice(), and concat(). Arrays can be of a fixed length or dynamically
// resized as needed, and they can be used with various array methods to
// perform common operations like sorting, filtering, and mapping.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
type Names = string[];
const names: Names = ["Smith", "Doe"];
assert.equal(names.every( s => typeof s === 'string'), true );

type PersonT = {
	name: string,
	age: number
}

const Person = (name: string, age: number): PersonT => ({ name, age });
const persons: PersonT[] = [{ name: 'Ju', age: 9}]