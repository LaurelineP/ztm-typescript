import axios from 'axios';
import { CurrentWeather } from './weather.model';
import type { CurrentWeatherAPIResponse, LocationInfo } from "./weather.types";




export async function fetchLocationData(
	apiURL: string,
	locationName: string
): Promise<LocationInfo> {
	const requestOptions = {
		method: 'GET',
		url: apiURL,
		params: {
			q: locationName
		}
	}
	const response = await axios.request<LocationInfo[]>(requestOptions);
	if (response.status === 200 && response.data.length > 0) {
		return response.data[0];
	} else { throw new Error(`Unable to find location details`) }

}

export async function fetchWeatherData(
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
			temperature_unit: 'celsius',
			speed_unit: 'kmh',
			current_weather: true
		}
	}

	const response = await axios.request(requestOptions);

	if (response.status === 200 && 'current_weather' in response?.data) {
		if (response.data.current_weather === undefined) throw new Error(`Unable to find weather details`);
		const currentWeather = response.data.current_weather as CurrentWeatherAPIResponse;
		return new CurrentWeather(currentWeather);
	} else {
		console.error('Unable to fetch weather data');
		throw new Error(`Unable to fetch weather data`);
	}
}