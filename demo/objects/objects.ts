/* eslint-disable */
import { strict as assert } from "assert";

// Objects are a fundamental data type used to represent a collection of
// properties with their respective values. They are defined using either an
// object literal notation or a constructor notation.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html

type Coordinate = {
	x: number,
	y: number,
}

const coordinate: Coordinate = {
	x: 10.12,
	y: 10.12,
}
assert.equal(Object.values(coordinate).every( x => typeof x === 'number' ), true)