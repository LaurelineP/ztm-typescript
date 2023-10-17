/* eslint-disable */

// Optional fields are convenient because they allow situations
// where it may not be appropriate to have data present. However,
// they make it cumbersome to access any additional data that is
// behind the optional field. For example, trying to access multiple
// optional objects one after the other requires multiple checks for
// `undefined` and multiple `if` blocks.
//
// With 'Optional Chaining', it is possible to combine all of the `if`
// blocks into a single line using the 'optional property access' operator.

// The optional property access operator is a question mark (?) and allows
// access to optional fields. It will continue to access optional fields
// using the following behavior:
//  - Access fields until `undefined` is encountered, and then set the
//    expression to `undefined.`
//  - Access fields until the last field is accessed, and then set the
//    expression to the value of the last field.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining


// PII: Personal Identify Information
interface PII {
	age?: number;
}

interface SearchResultI {
	name: string;
	PII?: PII
}

class Database {
	search(name: string): SearchResultI | undefined {
		switch( name ){
			case 'John':
				return {
					name: 'John Does',
					PII: { age: 22 }
				}
			case 'Jane':
				return {
					name: 'Jane Explora'
				}
			default: return;
		}
	}
}

const database = new Database();
const resultJohn = database.search('John');
const resultJane = database.search('Jane');

const results = [ resultJohn, resultJane ];
results.forEach( result => {

	const conditionWithoutOptionalChaining = (
		result !== undefined
		&& result !== null
		&& result.PII !== undefined
		&& result.PII !== null
		&& result.PII.age !== undefined
		&& result.PII.age !== null
	)

	// optional chain: automatically checks for undefined || null
	const conditionWithOptionalChaining = (
		!!result && !!result?.PII?.age
	)

	if( conditionWithOptionalChaining ){
		console.table({ ...result });
	}
})