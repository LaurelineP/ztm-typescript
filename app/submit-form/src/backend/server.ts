import path from "node:path";
import cookie from "@fastify/cookie";
import formBody from "@fastify/formbody";
import staticFiles from '@fastify/static'
import dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import nunjucks from 'nunjucks';
import { z } from 'zod';

import { connect, newDatabase, SqliteUserRepository, SqliteSessionRepository } from './db'


/* -------------------------------------------------------------------------- */
/*                            ENVIRONMENT VARIABLES                           */
/* -------------------------------------------------------------------------- */
// gets secret variables from .env file ( root of this directory )
dotenv.config();
const ENVIRONMENT = process.env.NODE_ENV;

/* --------------------------- COOKIE ENV VARIABLE -------------------------- */
const COOKIE_SECRET = process.env.COOKIE_SECRET;
if (COOKIE_SECRET === undefined) {
	console.error('Must have a cookie');
	process.exit(1);
}


/* ------------------------------ NUNJUCKS SETUP ------------------------------ */
const template = new nunjucks.Environment(
	// loading templates
	new nunjucks.FileSystemLoader(path.join(__dirname, 'templates')),
);

/* --------------------------- DATABASE SETUP --------------------------- */
const USERS_DB = './users.sqlite';

const fastify = Fastify({
	logger: true
})

/* ------------------------------- middlewares ------------------------------ */
fastify.register(formBody);
fastify.register(cookie, {
	secret: COOKIE_SECRET
});
fastify.register(staticFiles, {
	root: path.join(__dirname, '../../dist')
})


/* --------------------------------- routes --------------------------------- */
// testing routes
fastify.get('/', async (request, response) => {
	await response.send('hello');
});




const startServer = async (): Promise<void> => {
	try {
		const db = await connect(USERS_DB);
		newDatabase(db);

		await fastify.listen({ port: 8089 });
	} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
}

startServer();