
import fastifyPlugin from 'fastify-plugin';
import type { FastifyRequest, FastifyReply, FastifyPluginCallback, FastifyInstance, FastifyPluginAsync } from "fastify";

export const FLASH_MSG_COOKIE = 'flash';
const SESSION_COOKIE = 'SESSION_ID';

/* -------------------------------------------------------------------------- */
/*                      COOKIES AND FLASH COOKIES HELPERS                     */
/* -------------------------------------------------------------------------- */

/* ----------------------------- COOKIES HELPERS ---------------------------- */
export const setSessionCookie = (response: FastifyReply, sessionId: string): FastifyReply => (
	response.setCookie(
		SESSION_COOKIE, sessionId, {
		path: '/'
	})
)

export const readSessionCookie = (request: FastifyRequest): string | undefined => {
	const sessionId = request.cookies[SESSION_COOKIE];
	return sessionId;
}


/* -------------------------- FLASH COOKIES HELPERS ------------------------- */
export const setFlashCookie = (response: FastifyReply, sessionId: string): FastifyReply => (
	response.setCookie(FLASH_MSG_COOKIE, sessionId, {
		path: '/'
	})
)

export const readFlashCookie = (request: FastifyRequest): string | undefined => {
	const cookieMsg = request.cookies[FLASH_MSG_COOKIE];
	return cookieMsg;
}




const callBackFastifyPlugin: FastifyPluginCallback = (fastify, _options, done) => {
	fastify.addHook('onRequest', async (_request: FastifyRequest, response: FastifyReply) => {
		response.setCookie(FLASH_MSG_COOKIE, '', { path: '/' })
	});
	done();
}

export const clearFlashCookie = fastifyPlugin(callBackFastifyPlugin);