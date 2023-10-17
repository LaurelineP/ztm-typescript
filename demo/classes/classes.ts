/* eslint-disable */
import { strict as assert } from "assert";

// Classes are a way to define blueprints for objects. They encapsulate data
// and behavior and can be used to create instances of objects with predefined
// properties and methods. Classes can be extended and inherited, allowing for
// the creation of complex object hierarchies.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/classes.html

class Color {
	r: number = 0;
	g: number = 0;
	b: number = 0;
}

const red = new Color();
red.r = 255;

const green = new Color();
green.g = 255;

const blue = new Color();
blue.b = 255;


console.table({ red, green, blue })


class Dimension {
	length: number;
	width: number;
	// height: number;
	constructor( length: number = 0, public height: number = 0, width: number = 0){
		this.length = length;
		this.height = height;
		this.width = width;
	}
}

const dim1 = new Dimension()
console.log('dim1:', dim1)