/* eslint-disable */
import { strict as assert } from "assert";

// Generic classes offer the ability to define a class that can work with a
// variety of different data types. By using generic type parameters, you can
// create a single class that can be customized to work with any type of data
// that you need.
//
// Similarly to generic functions, generic classes allow you to write more
// flexible and reusable code, since you don't have to create a separate class
// for every possible data type.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes



class Stack<T> {
	private readonly items: T[] = [];

	public push(item: T): void {
		this.items.push(item);
	}

	public pop(): T | undefined {
		return this.items.pop();
	}

	public peek(): T | undefined {
		// return this.items[this.items.length - 1];
		return this.items.at(-1)
	}

	public isEmpty(): boolean {
		return this.items.length === 0
	};

	public getStacks(): T[] {
		return this.items;
	}
}

/**
 * Specifying the generic class:
 * - avoids the need for type casting
 * - prevent from adding unexpected values
 */
const strings = new Stack<string>();

strings.push('hello');
strings.push('wold');
strings.push('!');
strings.pop();
const peekedStack = strings.peek();
console.log('peekedStack:', peekedStack)
const isEmptyStack = strings.isEmpty();
console.log('isEmptyStack:', isEmptyStack)
const stack = strings.getStacks();
console.log('stack:', stack)
