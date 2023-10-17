/* eslint-disable */
import { strict as assert } from "assert";
async function fetchData(userId: number): Promise<{ name: string }> {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
	const user = await response.json();
	return user
}

(async () => {
	try {
		fetchData(404)
	} catch (error){
		console.log( 'User not found')
	}
})