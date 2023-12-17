import type { AxiosStatic } from 'axios';
import { CurrentWeather } from './weather.model';
import { currentWeatherAPIResponseSchema, locationInfoSchema, TLocationInfo } from "./weather.zod";

export async function fetchLocationData(
	axios: AxiosStatic,
	apiURL: string,
	locationName: string
): Promise<TLocationInfo> {
	const requestOptions = {
		method: 'GET',
		url: apiURL,
		params: {
			q: locationName
		}
	}
	const response = await axios.request(requestOptions);
	if (response.status === 200) {
		try {
			return locationInfoSchema.parse(response.data[0]);
		} catch (error) {
			throw new Error(`Unable to find location details`)
		}
	} else { throw new Error(`Failed to fetch location data`) }

}

export async function fetchWeatherData(
	axios: AxiosStatic,
	apiURL: string,
	lat: string,
	lon: string
): Promise<CurrentWeather> {
	const requestOptions = {
		method: 'GET',
		url: apiURL,
		params: {
			latitude: lat,
			longitude: lon,
			hourly: 'temperature_2m',
			temperature_unit: "celsius",
			current_weather: true,
			forecast_days: 1,
		}
	}

	const response = await axios.request(requestOptions);

	if (response.status === 200) {
		try {
			const res = currentWeatherAPIResponseSchema.parse(response.data);
			return new CurrentWeather(res);
		} catch (error) {
			throw new Error(`Received invalid API response`)
		}
	} else {
		throw new Error(`Unable to fetch weather data`);
	}
}