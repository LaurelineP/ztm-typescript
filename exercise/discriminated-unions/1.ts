// Write a program that calculates the total area of different shapes using
// discriminated unions. Include support for at least squares, rectangles, and
// circles. The functionality to calculate the area of each shape should exist
// in a single function and the function should select the appropriate
// calculation based on the disciminator.
//
// The area of a square: side^2
// The area of a rectangle: width * height
// The area of a circle: Math.PI * radius^2
//
// Make these assertions to check your code:
// - Square with side length of 5 has an area of 25
// - Rectangle with width of 4 and height of 6 has an area of 24
// - Circle with radius of 3 has an area of Math.PI * 9

import { strict as assert } from "assert";

/* --------------------------------- HELPERS -------------------------------- */
const getSideArea = (height: number, width: number): number => height * width;
const getRadialArea = (radius: number): number => Math.PI * radius ^ 2;


/* -------------------------------------------------------------------------- */
/*                      USING FUNCTION TO RETURN A SHAPE                      */
/* -------------------------------------------------------------------------- */

/* ------------------------- INDIVIDUAL SHAPE TYPES ------------------------- */
/** ℹ️ Note: those are specific types: enables an object to access a specific property without ts errors
 * 👎 Assigning all function with the discriminated union type would not allow us to access the properties
 *    - We would need to assign one of the specific types ( used in the discriminated union )
 *      hence the unitary type definition below
 * 👎 Assigning all function with the discriminated union type would not allow us to access the properties
 *  */
type TSquare = { kind: 'square', side: number, area: number }
type TRectangle = { kind: 'rectangle', width: number, height: number, area: number }
type TCircle = { kind: 'circle', radius: number, area: number }


type Shape =
	| TSquare
	| TRectangle
	| TCircle


/** ℹ️ Note: those are functions that return a Shape | not a Shape on its own
 * - 👎 to access one of the properties, we can't access the properties without assigning the right Shape
 *       ==> e.g.:	TSquare | TRectangle | TCircle
 * - 👌 for common properties, we can access the properties without them correctly
 *  */
const Square = (side = 0): TSquare => ({
	kind: 'square',
	side,
	area: side ** 2
})

const Rectangle = ({ height = 0, width = 0 }): TRectangle => ({
	kind: 'rectangle',
	height,
	width,
	area: height * width
});

const Circle = (radius = 0): TCircle => ({
	kind: 'circle',
	radius,
	area: radius ** 2 * Math.PI
});

/** ℹ️ Note: we can only access the common/shared properties
 * Shape type here is useful and access to the shared/common properties
 *  */
const getShapeArea = (shape: Shape): number => shape.area;
console.log(`The circle area is ${getShapeArea(Circle(5))}`);


const circle = Circle(15);
const square = Square(15);
const rectangle = Rectangle({ height: 15, width: 5 });

// If I had each shaped types as Shape, I would not be able to access them ( TS linting error )
console.log('circle radius:', circle.radius);
console.log('square side:', square.side);
console.log('rectangle height:', rectangle.height);

/* -------------------------------------------------------------------------- */
/*                           EXERCISES EXPECTATIONS                           */
/* -------------------------------------------------------------------------- */
/**
 * Using discriminated unions, we can create a type that can be one of several
 * Suits best objects
 */

type ShapeType =
	| { kind: 'square', side: number, area: number }
	| { kind: 'rectangle', width: number, height: number, area: number }
	| { kind: 'circle', radius: number, area: number }

function calculateArea(shape: ShapeType): number {
	switch (shape.kind) {
		case 'square':
			return shape.side ^ 2;
		case 'rectangle':
			return shape.width * shape.height;
		case 'circle':
			return Math.PI * shape.radius ** 2;
	}
}

const circle2 = Circle(15);
const square2 = Square(15);
const rectangle2 = Rectangle({ height: 15, width: 5 });

console.log('\ncircle area:', calculateArea(circle2));
console.log('square area:', calculateArea(square2));
console.log('rectangle area:', calculateArea(rectangle2));



assert(() => calculateArea(Square(5)) === 25);
assert(() => calculateArea(Rectangle({ height: 4, width: 6 })) === 24);
assert(() => calculateArea(Circle(3)) === Math.PI * 9);

/* -------------------------------------------------------------------------- */
/*                              CLASS EXPLORATION                             */
/* -------------------------------------------------------------------------- */


class _Square {
	kind = 'square';
	height: number;
	width: number;

	constructor(n: number) {
		this.height = n;
		this.width = n;
	}

	getArea(): number {
		return getSideArea(this.height, this.width)
	}
}



class _Rectangle {
	kind = 'rectangle';
	height: number;
	width: number;

	constructor({ height, width }) {
		this.height = height
		this.width = width
	}

	getArea(): number {
		return getSideArea(this.height, this.width)
	}
}



class _Circle {
	kind = 'circle';
	radius: number;

	constructor(n: number) {
		this.radius = n
	}

	getArea(): number {
		return getRadialArea(this.radius)
	}
}



const _square = new _Square(4);
const _rectangle = new _Rectangle({ height: 4, width: 10 });
const _circle = new _Circle(15);

console.log(_square.getArea());
console.log(_circle.getArea());
console.log(_rectangle.getArea());