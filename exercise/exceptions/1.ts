// Your task is to create a class that only allows text input up to a certain
// length. This length-restricted class will be used to ensure that users do
// not enter too much information into an input field.
//
// Requirements:
// - Create a class containing a length-limited string 
// - The class should not allow instantiation with strings greater than the
//   specified length
// - The class should allow setting the maximum string length
// - Throw an exception in the constructor of the class if the string is over
//   the maximum length

import { strict as assert } from "assert";

interface LimitedInputI {
	lengthLimit: number,
	value: string,
	error?: string
}

class LimitedInput implements LimitedInputI {
	lengthLimit = 9;
	value = '';
	error = ''
	constructor(value){
		try {
			if(value.length > this.lengthLimit){
				this.error = `[ Error ]: value's length must be inferior or equal to ${this.lengthLimit} `;
				throw new Error(this.error)
			}
			this.value = value;
		} catch( error ){ console.error(error) }
		}
}


const successCase = new LimitedInput('hello');
console.log('successCase:', successCase)
const failingCase = new LimitedInput('Let\'s dig into this problem');
console.log('failingCase:', failingCase);