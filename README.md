## Running a Demo

Using `ts-node`:

`pnpm exec ts-node path/to/file.ts`

Run a demo by invoking `tsc` and then `node`:

`tsc -p path/to/directory && node path/to/file.js`

Watch a specific demo directory and autobuild a JavaScript file when the TypeScript file changes:

`tsc -w -p path/to/directory`

and then run with

`node path/to/file.js`

## Initial Setup

`pnpm install`

## Running Tests

`pnpm test exercise/FOLDER_NAME/*.test.ts`

## Type Checking

`pnpm typecheck exercise/FOLDER_NAME`

## Linting

`pnpm eslint exercise/FOLDER_NAME/FILE.ts`

## Build & Run Node

`pnpm build exercise/FOLDER_NAME && node exercise/FOLDER_NAME/FILE_NAME.js`

## Generate docs

cd demo/ANY_DIR && npx typedoc DEMO_FILE.ts


<hr>

## Weather App using HTTP protocol
`./app`
- configure vscode so it considers the app's modules
	- right click on folder `./app/weather` > open in integrated terminal
	_(if your context menu does not display  open in integrated terminal )_
		- go to settings > search for terminal
	- install the project: `pnpm install`

### CLI script version
`./app/weather`

### Web app version
`./app/weather-ui`

## TypeScript Techniques and Patterns
- discriminated unions: type of various unions accepted during assignment or definition
- const assert: enables type inferring from type's value
- generic types: allows to have a wrapper around any type and infer from it   
( which avoid typing similar functions / classes )