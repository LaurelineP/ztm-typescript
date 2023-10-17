/* eslint-disable */
import { strict as assert } from "assert";

// Type predicates offer a way to determine the type of data based on a
// condition. This is achieved by defining a function that takes a some data as
// an argument, applies type guards, and returns a boolean indicating whether
// the data is a specific type. The function is then used to narrow down the
// type of the variable in subsequent code. Type predicates are useful when
// dealing with union types or other situations where the type of a variable
// may not be known at compile-time. Type predicates allow the type to be
// determined correctly which avoids runtime errors.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates


/** 
 * Type Predicate : allow to check the type based on a type
 *   - type guard, using "typeof" can only check for primitive values
 *     and not our own custom type(s)
 *   - type predicate, checking interfaces value, can check for both primitive 
 *     and our own custom type(s)
*/


//  type gard: function that checks what type of data it is provided
type StrOrNum = string | number;
function isStringOrNumber( value: StrOrNum ){
	return (
		 typeof value === 'string' ||
		 typeof value === 'number'
	);
}

//  type predicated : definition of the type 
type SquareT = "square";
type CircleT = "circle";

interface ShapeI {
	kind: SquareT | CircleT
	size: number
}

const isSquare = ( shape: ShapeI ) => {
	return shape.kind === "square";
}

// course implementation 

interface CircleI {
	kind: CircleT,
	size: number,
}

interface SquareI {
	kind: SquareT,
	size: number,
}

function isCircle( shape: ShapeI ): shape is CircleI {
	return shape.kind === 'circle'
}

function calculateArea( shape: ShapeI ): number {
	if( isSquare( shape )){
		return shape.size ** 2;
	}
	if ( isCircle( shape )){
		return Math.PI * shape.size ** 2;
	}
	throw new Error ( 'unknown shape ')
}

const circleRadius = calculateArea({ kind: 'circle', size: 20 });
console.log('circleRadius:', circleRadius)
const squareSize = calculateArea({ kind: 'square', size: 20 });
console.log('squareSize:', squareSize)