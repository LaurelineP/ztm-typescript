DTS: definition typescript acronym

Meant to type modules / library written
for other to use the library

HOW TO: 
- create a new file with the same name as your library and add `.d.ts` to dissociate it from the original one

- check the functions and types them from this new file ( with no logic )
	- you can copy the first function line in order to have the arguments in mind

	`example: export function add(a: number, b: number, args: number[]): number;`

- create a file `dts.ts` : to import the `<mylib>.d.ts` content file and export them from this `dts.ts` file