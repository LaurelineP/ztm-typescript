// pnpm test demo/testing/strings/.test.ts
/**
 * Testing
 * - after executing the command to test, how to read it :
 * 	- a test conclusion if it failed or passed & how long it took
 * 	- Table
 * 		- file: test file ran
 * 		- % stmts ( statements ): case s tested
 *   	- % branch: corresponds to code including if, else, else if code
 * 					( ex: no branch would evaluate at 100% )
 * 		- % Funcs: percent of functions covered - in comparison with the code implementation
 * 					( ex: testing one function on 4, will be 1/4 * 100 = 25)
 * 		- % Lines: code source line that are tested
 * 		- % Uncovered Line #s : code source lines that are were not tested
 * 	- Bottom report: 
 * 		- Tests Suites: count of suites ( encapsulated by "it" keywords )
 * 		- Tests: count of tests ( encapsulated by "expect" keywords )
 * 		- Snapshots: code object representation of a code / output - checking for regression
 */
import { concat, div, slowString, failedString } from './strings';

it('[ concat ] should return "Hello, world!"', () => {
	expect(concat('Hello, ', 'world!')).toEqual('Hello, world!');
});

it('[ divide - div ] should not be able to divide by 0', () => {
	expect(div(2,2)).toEqual(1);
});

it('[ divide - div ] should not be able to divide by 0', () => {
	expect(() => {
		div(10,0)
	}).toThrowError();
});

it('[ slowString ] should fetch "sample" text', async () => {
	slowString().then( data => {
		expect( data ).toEqual('sample');
	})
	/** currently the code does not have promise rejection
	 * but we want to state it here -- evaluated to undefined for now
	 *  */
	.catch( error => expect(error).toBeUndefined());
});

it('[ failedString ] should reject with "whoops', async () => {
	failedString()
		.then( data => {
			expect( data ).toBeUndefined();
		})
		/** currently the code does not have promise rejection
		 * but we want to state it here -- evaluated to undefined for now
		 *  */
		 .catch( error => expect(error).toEqual("whoops"));
});