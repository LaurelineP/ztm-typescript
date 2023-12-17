import { z } from 'zod';
export const locationSchemaRoute = z.object({
	location: z.string()
})