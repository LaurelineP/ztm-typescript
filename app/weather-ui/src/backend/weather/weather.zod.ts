import { z } from 'zod';



// 1 - Create a zod schema for the LocationInfo type
export const locationInfoSchema = z.object({
	lat: z.string(),
	lon: z.string(),
	display_name: z.string(),
});

export type TLocationInfo = z.infer<typeof locationInfoSchema>;

// 2 - Create a zod schema for the CurrentWeatherAPIResponse type
export const currentWeatherAPIResponseSchema = z.object({
	current_weather: z.object({
		temperature: z.number(),
		windspeed: z.number(),
		winddirection: z.number(),
		weathercode: z.number(),
		is_day: z.number(),
		time: z.string(),
	}),
	hourly_units: z.object({
		temperature_2m: z.string(),
	}),
	hourly: z.object({
		temperature_2m: z.array(z.number()),
	})
});
export type CurrentWeatherAPIResponse = z.infer<typeof currentWeatherAPIResponseSchema>;
