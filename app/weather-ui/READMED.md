# README
1. LocationInfo review
- api file : adds as first argument to the request `axios: StaticAxios`
this will help us during testing processes;
- type file - reviewing to check the values types instead of just using inferring.  
This is done using zod


1. Using Zod
Typing the value instead of inferring process in the type file
-  `import {z} from 'zod'`
- use zod in the *new* interface `LocationInfoSchema`
	- `z.object` checks how the object is construct verifying the keys
	- `z.string()` checks the type of the values
```ts

export const locationInfoSchema = z.object({
	lat: z.string(),
	lon: z.string(),
	display_name: z.string(),
});

export type TLocationInfo = z.infer<typeof locationInfoSchema>;
```

- use zod in code
	- remove any code referring to it
	in the API file, remove the following`request<LocationInfo>`
	- remove the code checking for keys in response object
	- adjust the return value as it uses zod : `locationInfoSchema.parse(response.data[0])`

2. WeatherInfo review
- types file: review `CurrentWeatherAPIResponse` and create `currentWeatherAPIResponseSchema`
```ts
export const currentWeatherAPIResponseSchema = z.object({
	current_weather: z.object({
		temperature: z.string(),
		windspeed: z.number(),
		winddirrection: z.number(),
		weathercode: z.number(),
		is_day: z.number(),
		time: z.string(),
	}),
	hourly_units: z.object({
		temperature_2m: z.string(),
	}),
	hourly: {
		temperature_2m: z.array(z.number()),
	}
});
```
- helpers file: delete the formate function
( used for the cli project not this one) [`formatTemperature`, `formatWind`];

- 3 Adjust the `CurrentWeather` class
	- remove the `wind`
	- change `daytime` in `is_day` to match the real response as a boolean
	- add `hourlyTmp` as an array of numbers


- 4. server file :
- import dotenv and axios
- create env variable from process.env.NODE_ENV after having configured dotenv
- create a constants for all template files ( nunchucks files )
```
const templates = new nunjucks.Environment(
  new nunjucks.FileSystemLoader("src/backend/templates")
)
```
- create a server using **fastify**

# Create routing
- get location with a param LOCATIONNAME
- else redirect to to template `get_started`
using the template nunchunks library, we provide the js to implement within the templates
Running the project: `pnpm dev`

# Testing locations
Using axios-mock-adapter library
Running the project: `pnpm test .`
