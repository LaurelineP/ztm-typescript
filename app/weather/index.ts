import path from 'node:path';
import { fetchLocationData, fetchWeatherData } from './package/weather.api';
import type { LocationInfo } from "./package/weather.types";

const GEOCODE_API_URL = 'https://geocode.maps.co/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast/';



async function main(): Promise<number> {
	// expecting one argument when executing the CLI
	if (process.argv.length < 3) {
		const command = process.argv[0]
			.split(path.join(__dirname, 'node_modules'))[1]
			.split(/\//)[1]
		console.log('command:', command)
		console.error('CLI unique usage: weather <LOCATION>');
		return 1;
	}

	// get location from command line
	const location = process.argv[2];
	let locationInfo: LocationInfo;

	// fetch location data
	try {
		locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
	} catch (error) {
		console.error(error)
		return 1;
	}

	// fetch weather data
	try {
		console.log(`Fetching weather data for ${locationInfo.display_name}...\n`);
		const weatherInfo = await fetchWeatherData(
			WEATHER_API_URL,
			locationInfo.lat,
			locationInfo.lon
		)
		console.log(weatherInfo.format())
	} catch (error) {
		console.error(error)
		return 1;
	}

	return await Promise.resolve(0);
}


try {
	main()
} catch (error) {
	console.error(error)
}