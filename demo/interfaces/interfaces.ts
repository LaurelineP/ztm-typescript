/* eslint-disable */
import { strict as assert } from "assert";

// Interfaces provide a way to define the shape of objects or classes. They
// define the contracts that objects must follow, specifying the properties and
// methods that an object must have. Interfaces make it easier to write
// type-safe code by providing a way to ensure that objects are of the correct
// shape before they are used in a program. They also allow for code to be more
// modular and reusable, since objects can be easily swapped out as long as
// they adhere to the interface's contract.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
/* -------------------------------------------------------------------------- */
/*                    INTERFACES ( METHODS AND PROPERTIES )                   */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- TYPES --------------------------------- */
interface Area {
	// method signature "area"
	area(): number
}

interface Perimeter {
	perimeter(): number
}



interface PersonDetails {
	name: string;
	age?: number;
}
interface Address {
	street: string;
	city: string;
	country: string;
}

interface Product {
	productName: string;
	productPrice: string;
	productId: number
}

interface CustomerI  {
	customerId: number,
	address: Address,
	product: Product,
	customer: PersonDetails
}

// type alias
type AreaAndPerimeter = Area & Perimeter;

/* ---------------------------------- USAGE --------------------------------- */
class Rectangle implements AreaAndPerimeter {
	length: number = 1;
	width: number = 1;

	area() { return this.width * this.length }
	perimeter(){ return this.length + this.width }
}

/* --------------------------- INTERFACE X METHODS -------------------------- */
class Circle implements AreaAndPerimeter {
	radius: number = 4;
	area() { return Math.PI * this.radius ** 2 }
	perimeter(){ return Math.PI * this.radius; }
}

const rect = new Rectangle();
const circ = new Circle();

const areaShapes: Area[] = [ rect, circ ];

areaShapes.forEach( areaShape => {
	console.log(areaShape.area())
})


/* ------------------------ INTERFACE AND PROPERTIES ------------------------ */
class Customer implements CustomerI {
	customerId: number = -1;
	customer: PersonDetails = { name: ''};
	address: Address = { street: '', city: '', country: ''};
	product: Product = { productId: -1, productPrice: '', productName: ''};

	constructor( details: CustomerI)  {
		Object.keys(details).forEach(property => {
			this[ property as keyof CustomerI  ] = details[property]
		})
	}
}


const customerX = new Customer({
	customerId: 100,
	customer: {
		name: 'Lola Palooza',
	},
	address: {
		street: '44 Merryl Street',
		city: 'Melbourne',
		country: 'Australia',
	},
	product: {
		productId: 124,
		productName: 'hot chocolate',
		productPrice: '3$'
	}
})

console.log('customerX', customerX)