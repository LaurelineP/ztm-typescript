/* eslint-disable */

// `as const` allows you to create readonly values in your code. When you use
// `as const` on an object, array or tuple, TypeScript infers that the values
// are constant and cannot be modified later. This can help prevent unexpected
// bugs in your code and make it easier to reason about. It's particularly
// useful when working with APIs or configurations where values should not be
// changed during runtime.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions


/**
 * Regular union type
 * 	- does not restitute type when accessing the value
 */
type RGB = 'red' | 'green' | 'blue';
const colors: RGB[] = ['red', 'green', 'blue'];

/** ➡️ trying to push on this array will not throw an error as the array is not readonly
 *  	- TS will complain about the value not being part of the type but not about the
 *        ability to push on the array
 * 		Note: uncomment the line below to see the error
 *  */
// colors.push('yellow');

// ➡️ type being RBG but not the appropriate value ( red here )
const colorRGB = colors[0]; // type lint as "RGB"


/**
 * Union type with `as const`
 * 	- restitutes type when accessing the value (within a loop for example)
 *
 */
const RGBAsConst = ['red', 'green', 'blue'] as const;

// ➡️ type being "red" : const assertion allows to have access to the type as a value using the index
type ColorType = (typeof RGBAsConst)[number];
const redColor = RGBAsConst[0]; // type lint as "red"

/** ➡️ trying to push on this array will throw an error as the array is readonly
 * 	- this is the purpose of `as const`
 *  Note: uncomment the line below to see the error
 *  */
// RGBAsConst.push('yellow');


/* -------------------------------------------------------------------------- */
/*                    EXAMPLE 2: CONST ASSERTION ON OBJECT                    */
/* -------------------------------------------------------------------------- */
/** */
const Department = {
	Executive: 'top floor',
	Sales: 'middle floor',
	Warehouse: 'bottom floor'
	// as const: allows to provide the value instead of a type: comment &  hover one executive | sales | warehouse to see the difference
} as const;

/**
 * typeof: allows to infer the type from an object\
 * keyof typeof: allows to infer the type from an object's key
 * - allows to access the property's using dot notation ( a bit like enum would do )
 */
type DepartmentType = (typeof Department)[keyof typeof Department];
const executive = Department.Executive; // type lint as "top floor" thanks to the const assertion | without it, it would be "string"
const sales = Department.Sales; // type lint as "middle floor" thanks to the const assertion | without it, it would be "string"
const warehouse = Department.Warehouse; // type lint as "bottom floor" thanks to the const assertion | without it, it would be "string"


// value: will be typed as is any in here 
for (let k in Department) {
	const value = Department[k];
	console.log(Department[k])
}



// value: will be typed as the value of the Department's property
{
	let k: keyof typeof Department;
	for (k in Department) {
		const value = Department[k];
		console.log(Department[k])
	}
}
