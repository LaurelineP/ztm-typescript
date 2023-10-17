// Using at least one ternary operator, create a program that can convert
// Celsius and Fahrenheit temperatures.
//
// To convert °F to °C: (°C * 1.8) + 32
// To convert °C to °F: (°F - 32) / 1.8
//
// To confirm that your program works properly, do the following:
// 1. convert 25°C to °F, and assert that the value is 77
// 1. convert 68°F to °C, and assert that the value is 20

import { strict as assert } from "assert";


const getAlternativeTemperature = (value: string): string => {
	// console.log('value.split(/d/):', value.split(/\W/))
	const [ nString, type ] = value.split(/\W/);
	const n = Number(nString);

	return type.toLocaleLowerCase().includes('c')
		? `${(n * 1.8) + 32}°F`
		: `${(n - 32) / 1.8}°C`
}

assert.equal(getAlternativeTemperature('25°C'), '77°F');
assert.equal(getAlternativeTemperature('68°F'), '20°C');