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
		- unknown so far: livereload

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

	- cookies to set ( includes environment variable secret )