/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html
import { apiResponse } from "./mylib";
import type { APIResponse } from "./mylib";


const response = apiResponse();
if (!response) console.error("error", response);

if (response?.status === "success") {
	console.log(response.data.items[0].name);
}