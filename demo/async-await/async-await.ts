/* eslint-disable */
import { strict as assert } from "assert";

// `async/await` allows you to write asynchronous code in a synchronous way.
// The `async` keyword used with a function or closure creates an asynchronous
// context. The `await` keyword can be used inside an asynchronous context to
// wait for a `Promise` to resolve before moving on to the next line of code.
// While waiting, other code outside the function will execute. When the
// promise resolves, the value is returned and assigned to the variable on the
// left side of the `=` sign. This makes it easier to work with asynchronous
// code as you can write code in a more sequential way.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises


const userId = 41;
async function fetchUserData(userId: number): Promise<{ name: string }> {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
	const user = await response.json();
	return user;
}
/**  Asynchronous approach: context in which we add a try block */
(async () => {
	try {
		const userFound = fetchUserData(userId);
		console.log(userFound)
	} catch (error){
		console.log( 'User not found')
	}
})()    

/** Promise API approach */
fetchUserData(userId)
	.then(console.info)
	.catch(console.error)