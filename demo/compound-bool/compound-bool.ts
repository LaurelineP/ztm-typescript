/* eslint-disable */
import { strict as assert } from "assert";

const age = 18;

const isTeenager = age >= 13 && age <=  20;
assert.equal(isTeenager, true);
// assert.equal(isTeenager, false); // will raise an error on the terminal


const packageWeight = 30;
const packageLength = 50;
const hasFeeExemption = false;

const hasExtraFees = !hasFeeExemption && (
	packageWeight > 25 || packageLength > 40
);
assert.equal(hasExtraFees, true); // will raise an error in the terminal )
// assert.equal(hasExtraFees, false);
/**
 * "!feeExemption" means: if we don't have feeExemption do the rest
 */