/* eslint-disable */

// Iterators offer a way to traverse the elements of a collection one by one.
// The purpose of iterators is to provide a standard way for accessing and
// iterating over collections, such as arrays or maps, in a language-agnostic
// way. Using iterators, you can iterate over collections in a loop without
// having to worry about the underlying implementation of the collection.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html
const list: string[] = ['a', 'b', 'c'];

for ( let i = 0; i < list.length ; i++) {
	console.log( list[i] )
}

// for...of > value of object
for (const letter of list){
	console.log( letter )

}
// for...in > index of list or key of object
for (const index in list){
	console.log(index)
}


const numbers = {
	one: 1,
	two: 2,
	three: 3,
}

let property: keyof typeof numbers;

for( property in numbers ){
	console.log(property, numbers[property]);
}
