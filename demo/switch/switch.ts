/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch

function checkInputTypeMsg( value: string | number ): string{
	switch( typeof value ){
		case 'number': 
			return 'is number'
		case 'string': 
			return 'is string'
		default:
			return 'Error: value not handled'
	}
}


assert.equal(checkInputTypeMsg(5), 'is number');
assert.equal(checkInputTypeMsg('hey'), 'is string');
// @ts-ignore
assert.equal(checkInputTypeMsg(() => {}), 'Error: value not handled');