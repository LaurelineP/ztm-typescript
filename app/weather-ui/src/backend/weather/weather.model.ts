import axios, { AxiosStatic } from "axios";
import { weatherCodes } from "./weather.constants";
import { Temperature } from "./weather.types";
import { CurrentWeatherAPIResponse, currentWeatherAPIResponseSchema } from "./weather.zod";

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m&current_weather=true
export class CurrentWeather {
	temperature: Temperature;
	// wind: Wind;
	weathercode: number;
	isDay: boolean;
	time: string;
	hourlyTemp: number[];


	constructor(apiResponse: CurrentWeatherAPIResponse) {
		console.log('apiResponse:', apiResponse)
		this.temperature = {
			value: apiResponse.current_weather.temperature,
			unit: apiResponse.hourly_units.temperature_2m,
		}

		/* Removing wind as it is not used for weather-ui */
		// this.wind = {
		// 	speed: apiResponse.windspeed,
		// 	direction: apiResponse.winddirrection,
		// 	unit: 'km/h',
		// }

		this.weathercode = apiResponse.current_weather.weathercode;
		this.isDay = (apiResponse.current_weather.is_day === 1);
		this.time = apiResponse.current_weather.time;
		this.hourlyTemp = apiResponse.hourly.temperature_2m;

	}

	getConditions = (): string => weatherCodes[this.weathercode]


	/* Removing wind as it is not used for weather-ui */
	// format = (): string => {
	// 	const DESCRIPTION_LENGTH = 16;

	// 	const conditionHeader = "Condition".padStart(DESCRIPTION_LENGTH, " ");
	// 	const temperatureHeader = "Temperature".padStart(DESCRIPTION_LENGTH, " ");
	// 	const windHeader = "Wind".padStart(DESCRIPTION_LENGTH, " ");

	// 	const condition = `${conditionHeader}: ${this.getConditions()}`;
	// 	const temperature = `${temperatureHeader}: ${formatTemperature(this.temperature)}`;
	// 	const wind = `${windHeader}: ${formatWind(this.wind)}`;

	// 	const formattedValues: string[] = [
	// 		condition,
	// 		temperature,
	// 		wind,
	// 	];

	// 	const newLine = "\n";
	// 	const formattedText = formattedValues.join(newLine);

	// 	return formattedText;
	// }

	/** Define low temperature */
	getLowTemperature = (): number => this.hourlyTemp.reduce((a, b) => Math.min(a, b));

	/** Define high temperature */

	getHighTemperature = (): number => this.hourlyTemp.reduce((a, b) => Math.max(a, b));
}


export async function fetchWeatherData(
	axios: AxiosStatic,
	apiURL: string,
	lat: string,
	lon: string,
): Promise<CurrentWeather> {
	const requestOptions = {
		method: 'GET',
		url: apiURL,
		params: {
			latitude: lat,
			longitude: lon,
			hourly: 'temperature_2m',
			temperature_unit: 'celsius',
			windspeed_unit: 'celsius',
			current_weather: true,
			forecast_days: 1
		}
	}

	const response = await axios.request(requestOptions);
	if (response.status === 200) {
		try {

			const responseData = response.data.current_weather;
			const responseParsed = currentWeatherAPIResponseSchema.parse(responseData)
			const currentWeather = new CurrentWeather(responseParsed);
			return currentWeather;
		} catch (error) {
			throw new Error('Invalid API Response')
		}
	} else {
		throw new Error(`Unable to fetch weather data`);
	}

}