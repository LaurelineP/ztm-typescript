import path from "node:path";
import cookie from "@fastify/cookie";
import formBody from "@fastify/formbody";
import staticFiles from '@fastify/static'
import dotenv from "dotenv";
import Fastify from 'fastify';
import nunjucks from 'nunjucks';
import { set, z } from 'zod';

import { checkEmailRules } from "../shared/email-rules";
import { checkPasswordRules } from "../shared/password-rules";
import { hashPassword, comparePassword } from "./auth";
import { clearFlashCookie, readFlashCookie, readSessionCookie, setFlashCookie, setSessionCookie } from "./cookies.helpers";
import { connect, newDatabase, SqliteUserRepository, SqliteSessionRepository } from './db'

import { accountCreateRequestSchema, accountLoginRequestSchema } from "./schemas.zod";
import type { User as UserType } from "./db.types";
import type { AccountCreateRequest, AccountLoginRequest } from "./schemas.zod";
import type { FastifyReply, FastifyRequest } from 'fastify';

/* -------------------------------------------------------------------------- */
/*                            ENVIRONMENT VARIABLES                           */
/* -------------------------------------------------------------------------- */
// gets secret variables from .env file ( root of this directory )
dotenv.config();
/**
 * 	- key: value
 * 	- SESSION_ID: string
 */

const ENVIRONMENT = process.env.NODE_ENV;

/* --------------------------- COOKIE ENV VARIABLE -------------------------- */
const COOKIE_SECRET = process.env.COOKIE_SECRET;
if (COOKIE_SECRET === undefined) {
	console.error('Must have a cookie');
	process.exit(1);
}


/* ------------------------------ NUNJUCKS SETUP ------------------------------ */
const templates = new nunjucks.Environment(
	// loading templates
	new nunjucks.FileSystemLoader(path.join(__dirname, 'templates')),
);

/* --------------------------- DATABASE SETUP --------------------------- */
/**
 * Database file path :
 * 	- defines the name of the database sqlite based on the file path
 *  - Note: at the beginning, the database file is empty or even does not exist
 * 		- this will be generated on the first connection to the server
 * 			- will create if not exist the table users and sessions
 * 			that we are defining separately in the file db.ts
 * 			using their repositories
 * - How to re-create a db: remove the file, kill the server, restart the server
 */
export const DATABASE = './submit-form-database.sqlite';


/* ------------------------------- MIDDLEWARES ------------------------------ */
const fastify = Fastify({
	logger: false
})

//  process form data
fastify.register(formBody);

// enables cookies
fastify.register(cookie, {
	secret: COOKIE_SECRET
});

// clear flash cookie on every request
fastify.register(clearFlashCookie);

// serve static files
fastify.register(staticFiles, {
	root: path.join(__dirname, '../../dist')
})


/* --------------------------------- HELPERS -------------------------------- */
const renderResponse = async (response: FastifyReply, templateRendering: any): Promise<FastifyReply> => (
	await response
		.header('Content-Type', 'text/html;charset=UTF-8')
		.send(templateRendering)
)




/* --------------------------------- routes --------------------------------- */
fastify.get('/', async (_request, response) => {
	response.redirect('/signin')
});


/* -------------------------------------------------------------------------- */
/*                                   SIGNUP                                   */
/* -------------------------------------------------------------------------- */
// FE - rendering the signup page 
fastify.get('/signup', async (request: FastifyRequest, response: FastifyReply) => {
	// rendering template signup
	const serverMessage = readFlashCookie(request);
	const render = templates.render(
		'signup.njk',
		{
			environment: ENVIRONMENT,
			server_msg: serverMessage
		});
	return await renderResponse(response, render);
});

// BE - handling the signup form
fastify.post('/account/signup', async (request: FastifyRequest, response: FastifyReply) => {

	let requestData: AccountCreateRequest;


	try {
		requestData = accountCreateRequestSchema.parse(request.body);
		const hashedPassword = await hashPassword(requestData.password);
		console.log('hashedPassword:', hashedPassword)


		const hasNoEmailFailure = checkEmailRules(requestData.email);
		const hasNoPasswordFailure = checkPasswordRules(requestData.password);
		if (!hasNoPasswordFailure || !hasNoEmailFailure) {
			setFlashCookie(response, 'Invalid credentials format');
			return await response.redirect('/signup');
		}

		// 
		console.log('requestData:', requestData)
		if (requestData.didAgreeToTerms !== 'on') {
			setFlashCookie(response, 'You must agree to the terms');
			return await response.redirect('/signup');
		}



		/* ------------------------------ CREATE A USER ----------------------------- */
		const newUser: UserType = {
			id: 0,
			email: requestData.email,
			hashedPassword,
			didAgreeToTerms: true,
		}
		// Saves newUser in database
		const db = await connect(DATABASE);
		const userRepository = new SqliteUserRepository(db);
		const savedUser = await userRepository.create(newUser);
		console.log('🔥DB savedUser:', savedUser)

		// Create and set a session id
		const sessionId = await new SqliteSessionRepository(db).create(savedUser.id);
		console.log('❌❌❌ sessionId:', sessionId)
		setSessionCookie(response, sessionId);

		return await response.redirect('/welcome');

	} catch (e) {
		console.log(e);
		setFlashCookie(response, 'Something went wrong');
		response.redirect('/signup');
	}


	// rendering template signup
	const render = templates.render('signup.njk', { environment: ENVIRONMENT });
	return await renderResponse(response, render);
});



/* -------------------------------------------------------------------------- */
/*                                  SIGN IN                                   */
/* -------------------------------------------------------------------------- */


// FE - rendering the signin page
fastify.get('/signin', async (request, response) => {
	// rendering template signin
	const serverMessage = readFlashCookie(request);
	const render = templates.render('signin.njk',
		{
			environment: ENVIRONMENT,
			server_msg: serverMessage
		}
	);
	return await renderResponse(response, render);
})

fastify.post('/account/signin', async (request: FastifyRequest, response: FastifyReply) => {

	let requestData: AccountLoginRequest;
	try {
		requestData = accountLoginRequestSchema.parse(request.body);
		/* ------------------------------ LOG A USER ----------------------------- */

		// Saves newUser in database
		const db = await connect(DATABASE);
		const userRepository = new SqliteUserRepository(db);
		const existingUser = await userRepository.findByEmail(requestData.email);
		const isSamePassword = existingUser !== undefined && await comparePassword(requestData.password, existingUser.hashedPassword);
		if (!isSamePassword) {

			setFlashCookie(response, 'Invalid credentials');
			// TODO: show error message
			return await response.redirect('/signin');
		} else {
			// create a session
			const sessionId = await new SqliteSessionRepository(db).create(existingUser.id);
			setSessionCookie(response, sessionId)
			return await response.redirect('/welcome');
		}

	} catch (e) {
		console.log(e);
		setFlashCookie(response, 'Something went wrong');
		return await response.redirect('/signup');
	}


	// // rendering template signup
	// const render = templates.render('signup.njk', { environment: ENVIRONMENT });
	// return await renderResponse(response, render);
});

// Log only if has sessionId
fastify.get('/welcome', async (request, response) => {
	const sessionId = readSessionCookie(request);
	if (sessionId !== undefined) {
		// connect to db to check existing session
		const db = await connect(DATABASE);

		const sessionsRepository = new SqliteSessionRepository(db);
		const existingUserSession = await sessionsRepository.get(sessionId);
		console.log('existingUserSession:', existingUserSession)

		// if sessions does exist - redirect to login 
		if (existingUserSession === undefined) {
			setFlashCookie(response, 'Session expired, please login again');
			return await response.redirect('/signin');
		} else {
			return await response.send('Hello 🙌');
		}

	} else {
		setFlashCookie(response, 'You must be logged in to see this page');
		return await response.redirect('/signin')
	}
});



const startServer = async (): Promise<void> => {
	try {
		// connects to the database
		const db = await connect(DATABASE)
			.then(async db => {
				console.log('🔥 DB connected:', db)
				const rowsUsers = await db.all('SELECT * FROM users');
				console.log('rowsUsers:', rowsUsers)


				const rowsSession = await db.all('SELECT * FROM sessions');
				console.log('rowsSession:', rowsSession)

				const infoSession = await db.all('PRAGMA table_info(sessions)');
				console.log('infoSession:', infoSession)
				// console.log('infoSession:', infoSession)
				return db;
			}).catch(e => {
				console.log('Database connection error:', e)
			})
		if (db !== undefined) newDatabase(db);

		// starts the server on port 8089
		await fastify.listen({ port: 8089 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
}

startServer();
