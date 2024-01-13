/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

import { add, setCase, quote, max } from "./mylib";
import type { ParamKind } from "./mylib";


/* -------------------------- Assertion for setCase ------------------------- */
const message = "Hello World";
const upper = setCase(message, "uppercase");

assert(upper === "HELLO WORLD");


/* ----------------------- Assertion for add function ----------------------- */
const sum = add(1, 2, 3, 4, 5);