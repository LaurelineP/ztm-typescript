/* eslint-disable */

// Union types allows you to declare a variable or parameter that can hold
// multiple types of value and are declared using the pipe symbol (|) between
// the types. Union types can be useful when you want something to accept
// multiple types of input.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types

// Union type : a type having limited value possibilities
type Color = "red" | "green" | "blue";


const colorOK: Color = 'red';
// const colorNOK: Color = 'yellow';