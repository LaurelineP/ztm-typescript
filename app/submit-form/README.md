# Form Submission in TS

## Personal recommendation: Discovering app on our own ( before watching videos )
1. `package.json` at root level : 
	- scripts
	```json 
	"scripts": {
		"dev": "concurrently \"pnpm dev:tailwind\" \"pnpm dev:backend\" \"pnpm dev:frontend\" \"pnpm dev:reload\"",
		"dev:tailwind": "tailwindcss -w -i src/backend/templates/index.css -o dist/styles.css",
		"dev:backend": "nodemon -w ./src -e ts,njk,css --exec ts-node src/backend/server.ts",
		"dev:frontend": "nodemon -w ./src -e ts --exec parcel build src/frontend/**/*.ts",
		"dev:reload": "pnpm livereload -w 2000 -e html,css,njk,ts",
		"test": "jest",
		"lint": "eslint",
		"check": "node check.js"
	},
	```
	- dev packages & features - describing what run the app
		- environment: node, nodemon
		- linting & format: ts, eslint, prettier
		- style: tailwindcss, postcss
		- tests: jest, strictest
		- build related: bundler parcel
		- UI: daisyui
		- unknown so far: livereload most likely to reload app
		- zop: schema check

- any existing app need to be installed,
 which generally tend to be from package.json and package-lock.json 
As we've seen in `package.json`: there are not a lot of packages, what about the committed package-lock.json

2. Package-lock.json ( here pnpm-lock.json ) & using VSCode outline feature
--> indicating the use of pnpm instead of npm or yarn CLI
- fastify: db
- bcrypt: text encryption ( password )
- daisyui: most likely an UI lib
- nunjucks: don't remember - template engines I reckon ( to pass dynamical values to static templates )
- sqlite3: BDMS database SQL
- uuid: to generate unique id for DB

3. Project current state > `src` ( root level )
	- `src`: fullstack app - `frontend` & `backend`
		- `backend`: holding template to use
		- `frontend`: mere setup

4. Other insight at root level :
	- one script `build-frontend`



## Analyzing  purpose of this project - determining what the development flow
*development flow: what to work with first*

Objective: submit form
( either signin or signup )
- sign-up: submitted info > stored in DB > login page > signing in > redirect
- sign-in: signing in > redirect
- user signin > BE > check db :
	- exist 
	- not exist

1. Setup database
Database is the core of a signup / signin: allows to authorize a connection if the submitted info match a db 

Tools: `[ uuid, sqlite3, promised-sqlite3 ]`

- add  dependencies: 
	- ts types as dev-dep: `pnpm add -D @types/sqlite3`
	- sqlite3 as dependency: `pnpm add sqlite3`
	- promise based sqlite: `pnpm add promised-sqlite3`
	- uuid: to generate uuid when user is created: `pnpm add uuid`
- database setup
	- create a `db.ts`: in `backend/` add the file
	- use sqlite: config to do
	Note: SQlite is great for this kind of app ( exercise, accepting a lot of data ) but for production, better use PostGre or MySQL to ensure it works
	- see `./backend/db.ts`
		- model type for db sign-up: has 3 inputs
			- email
			- password
			- agreement checkbox

- database creation
	- create user - using `db.exec`:  write a query to match the user model and
		define what kind of values they hold

	- create sessions (associative table) on user_id and has a 
	cascade on delete ( probably on deletion will also delete user ? or on delete user > will delete sessions )

- define on UserRepository the actions classes
	- using `this.db.exec("<QUERY> VALUES(?, ?, ?), <VALUES>)`
	
- defining UserSessionRepository class
	- define interface Session { id, sessionId, userId }
	- define interface SessionRepository { create, get }
	- define class SQliteSessionRepository 

Note on sqlite3 / promised-sqlite3
- `db.exec`: execute one or more query ( written as string )
- `db.run`: execute a query with parameters
- `db.get`: execute a query with parameters + return value

2. Setup Server
Server must connect to DB, renders templates and test db
Tools: `[ path, fastify, dotenv, nunjucks, zod ]`

- installing tools / packages & their types
	- packages: `pnpm add fastify dotenv nunjucks @fastify/formbody, @fastify/static @fastify/cookie`;
	- types: `pnpm add -D zod @types/fastify @types/dotenv @types/nunjucks @types/zod`;

- Code for server
	- imports all packages, and all exported variables needed
	( connect, newDatabase, SqliteUser, SqliteUserRepository, SqliteSessionRepository )

	- environment variables to load

	- defines endpoints
		- endpoints for the frontend templates ( app pages )
			- /
			- /signin
			- signup

		- endpoints for the API: allowing to do some logic on the action from those pages
			- /account/signin
			- /account/signup


		- includes some sessions and error handling using cookies
			## Cookies to set ( includes environment variable secret )
			Cookie of the session must be set once a user is logged - so anytimes 
			it makes request it is still recognized by the server and authorized to communicate with it
			Generally handling session information and such

			### Setting cookies
			`fastify.setCookie(<NAME_OF_COOKIE>, <VALUE>)`

			## Flash cookie - for error in client side to display:
			Setting a cookie on the client side that could be read for the next request to come
			( hence not lost after being redirected )
			Creating with a middleware ( in here )

			This rely on adding a middleware on the reply to the fastify using *fastify-plugin*
			each time a response is made it can 
			- send a FLASH_COOKIE_MSG to the frontend and clear the cookie
			- so when it get redirected to have the ability to 
				- read a cookie message 
				- or also to clear the cookie msg 

				### sending a flash cookie message
				Defining the helpers dedicated for some functionality we want to use, 
				we will consume them 
				- Each time the app redirects because of an error, it is usually where
				we need to add an error message. 
					- adds a setFlashCookie before the redirects happen.


# Code for frontend
The frontend is rendering templates using nunjucks
( template can be provided some dynamism with js injected in it)
These templates mainly renders 2 pages and both have forms.
We will be handling the logic regarding the forms 
( see './src/frontend/fields-error.ts )

## Handling the form validation 
( see './src/frontend/fields-error.ts )
Defining a class that will hold our possible errors, will help us 
defining which error the frontend should display at which field

It will have
- errors : to collect all the errors
- set method: to set the error which will do some DOM manipulation
	- to have a visual error feedback ( style )
	- to have a hint error message ( error message to display )
- remove method: to remove the style and error message using DOM manipulation
- hasNoError: a boolean to ensure there are no errors in the form

## Adjusting frontend to define the input validations for signup and signin
The template signin already import a javascript file ( in js ).
Our file will be in ts and the server will transpile it to js but
we need to have the same file name
- create the signin.ts / signup.ts file ( referring to signin.js once transpiled )
- defines the errors
	- for a wrong email pattern
	- for a wrong password
	- for agreements not agreed
	- on submit: checking each & both inputs with the error with the error you defined




## Backend and flash messages
Using flash cookies we will provide custom errors on the actions taken by the user.
Note - templates includes a specific placeholder for server's error template from 
`server_message.njk` which is just a paragraph element to display the error message
that will be handled by the flash cookie through the variable to pass the template
`server_msg`

- user does not exist
- wrong credentials
- etc...

### Todos:
- for each frontend endpoint ( /signin, /signup ) read the flash cookie message and pass
it to the template
( remember: the flash message are already handle - we are just plugging them to the frontend pages serverd )


## Backend and input validations 
Despite having it checked in the frontend, we need to also double check them in the backend
( hence the shared folder for both BE and FE )

For each endpoint ( /account/signin, /account/signup ) - check the inputs before continuing to
the logic of signin and signup