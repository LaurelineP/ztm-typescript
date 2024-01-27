
import { z } from 'zod';


export const accountCreateRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
	didAgreeToTerms: z.string().optional(),
})

export type AccountCreateRequest = z.infer<typeof accountCreateRequestSchema>;



export const accountLoginRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
})

export type AccountLoginRequest = z.infer<typeof accountCreateRequestSchema>;