/* eslint-disable */
import { strict as assert } from "assert";

// Template literals allow us to substitute variables into a string.
// This makes it easy to display customized messages.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

const lastName = "Smith";
const firstName = "John";
const fullName = `${firstName} ${lastName}`;
assert.equal(fullName, 'John Smith');