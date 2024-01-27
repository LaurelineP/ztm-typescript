import path from "node:path";
import cookie from "@fastify/cookie";
import formBody from "@fastify/formbody";
import staticFiles from '@fastify/static'
import dotenv from "dotenv";
import Fastify from 'fastify';
import nunjucks from 'nunjucks';
import { z } from 'zod';

import { hashPassword, comparePassword } from "./auth";
import { clearFlashCookie, setFlashCookie, setSessionCookie } from "./cookies.helpers";
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
export const USERS_DB = './users.sqlite';


/* ------------------------------- MIDDLEWARES ------------------------------ */
const fastify = Fastify({
	logger: true,
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
fastify.get('/signup', async (_request: FastifyRequest, response: FastifyReply) => {
	// rendering template signup

	const render = templates.render('signup.njk', ENVIRONMENT);
	return await renderResponse(response, render);
});

// BE - handling the signup form
fastify.post('/account/signup', async (request: FastifyRequest, response: FastifyReply) => {
	console.log('🔥 COUCOU 1 - /account/signup', request.body)

	let requestData: AccountCreateRequest;
	try {
		requestData = accountCreateRequestSchema.parse(request.body);
		// TODO: hash password
		const hashedPassword = await hashPassword(requestData.password);

		// 
		if (requestData.didAgreeToTerms !== 'on') {
			setFlashCookie(response, 'You must agree to the terms');
			response.redirect('/signup');
		}

		/* ------------------------------ CREATE A USER ----------------------------- */
		const newUser: UserType = {
			id: 0,
			...requestData,
			hashedPassword,
			didAgreeToTerms: true,
		}
		// Saves newUser in database
		const db = await connect(USERS_DB);
		const userRepository = new SqliteUserRepository(db);
		const savedUser = await userRepository.create(newUser);
		console.log('🔥DB savedUser:', savedUser)

		// Create and set a session id
		const sessionId = await new SqliteSessionRepository(db).create(savedUser.id);
		setSessionCookie(response, sessionId);

		return await response.redirect('/welcome');

	} catch (e) {
		console.log(e);
		setFlashCookie(response, 'Something went wrong');
		response.redirect('/signup');
	}


	// rendering template signup
	const render = templates.render('signup.njk', ENVIRONMENT);
	return await renderResponse(response, render);
});



/* -------------------------------------------------------------------------- */
/*                                  SIGN IN                                   */
/* -------------------------------------------------------------------------- */

// FE - rendering the signin page
fastify.get('/signin', async (request, response) => {
	// rendering template signin
	const render = templates.render('signin.njk', ENVIRONMENT);
	return await renderResponse(response, render);
})

fastify.post('/account/signin', async (request: FastifyRequest, response: FastifyReply) => {
	console.log('🔥 COUCOU 1 - /account/signin', request.body)

	let requestData: AccountLoginRequest;
	try {
		requestData = accountLoginRequestSchema.parse(request.body);
		/* ------------------------------ LOG A USER ----------------------------- */

		// Saves newUser in database
		const db = await connect(USERS_DB);
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
		response.redirect('/signin');
	}


	// rendering template signup
	const render = templates.render('signup.njk', ENVIRONMENT);
	return await renderResponse(response, render);
});



const startServer = async (): Promise<void> => {
	try {
		// connects to the database
		const db = await connect(USERS_DB)
			.then(db => {
				console.log('🔥 DB connected:', db)
				return db;
			});
		newDatabase(db);

		// starts the server on port 8089
		await fastify.listen({ port: 8089 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
}

startServer();
