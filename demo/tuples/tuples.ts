/* eslint-disable */
import { strict as assert } from "assert";

// Tuples provide a way to express an array with a fixed number of elements of
// different types, creating a data structure with multiple different types.
// They can be especially handy when dealing with scenarios such as
// representing coordinates, storing key-value pairs, or returning multiple
// values from a function. Since they are type-checked, TypeScript can ensure
// that the values in the tuple are correct at compile time.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types
type Title = string;
type Author = string;
type PublishYear = number;
type Book = [Title, Author, PublishYear];

const book : Book = ['Permanent Record', 'E. J. Snowden', 2019];
assert.equal(Array.isArray(book), true);
assert.equal(book.length, 3);